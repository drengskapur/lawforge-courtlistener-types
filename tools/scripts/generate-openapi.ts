#!/usr/bin/env tsx
/**
 * Generate OpenAPI 3.0 spec from CourtListener API responses.
 * Ported from the previous Python script to TypeScript for monorepo consistency.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';

type Json = Record<string, unknown>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE_URL =
  process.env.COURTLISTENER_BASE_URL ?? 'https://www.courtlistener.com/api/rest/v4/';
const API_TIMEOUT_MS = Number(process.env.COURTLISTENER_TIMEOUT ?? '30000');

// Read version from package.json
const packageJson = JSON.parse(
  await fs.readFile(path.join(__dirname, '..', '..', '..', 'package.json'), 'utf8')
);
const PACKAGE_VERSION = packageJson.version;

const OUTPUT_PATH =
  process.env.COURTLISTENER_OPENAPI_OUTPUT ??
  path.join(__dirname, '..', 'openapi', `courtlistener-v${PACKAGE_VERSION}.openapi.json`);

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function fetchJson(url: string) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    }
    return (await resp.json()) as Json;
  } finally {
    clearTimeout(t);
  }
}

function ensureTrailingSlash(u: string) {
  return u.endsWith('/') ? u : `${u}/`;
}

function inferTag(pathname: string): string {
  const parts = pathname
    .split('/')
    .filter(Boolean)
    .filter((p) => !['api', 'rest', 'v4'].includes(p));
  if (!parts.length) return 'General';
  return parts[0].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function listEndpoints(): Promise<string[]> {
  // CourtListener exposes an index with link relations; we rely on the spec that /api/rest/v4/ lists endpoints
  const root = await fetchJson(ensureTrailingSlash(API_BASE_URL));
  const entries = Object.values(root)
    .filter((v) => typeof v === 'string' && String(v).startsWith('http'))
    .map((v) => String(v));
  return entries;
}

function pathFromUrl(u: string) {
  try {
    const url = new URL(u);
    return ensureTrailingSlash(url.pathname);
  } catch {
    return ensureTrailingSlash(u);
  }
}

function operationId(pathname: string, method: string) {
  const resource = pathname
    .replace(/^\//, '')
    .replace(/[-/]/g, '_')
    .replace(/_+/g, '_')
    .replace(/_$/, '');
  const prefix = method === 'GET' ? 'list' : method.toLowerCase();
  return `${prefix}_${resource || 'root'}`;
}

function schemaFromSample(val: unknown): Json {
  if (val === null || val === undefined) return { type: 'string', nullable: true };
  if (Array.isArray(val)) {
    return { type: 'array', items: val.length ? schemaFromSample(val[0]) : {} };
  }
  switch (typeof val) {
    case 'boolean':
      return { type: 'boolean' };
    case 'number':
      return Number.isInteger(val) ? { type: 'integer' } : { type: 'number', format: 'float' };
    case 'string':
      return { type: 'string' };
    case 'object': {
      const props: Json = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        props[k] = schemaFromSample(v);
      }
      return { type: 'object', properties: props };
    }
    default:
      return { type: 'string' };
  }
}

async function getSample(pathname: string): Promise<Json | null> {
  // take the first page of GET as sample
  try {
    const url = new URL(pathname, API_BASE_URL);
    url.searchParams.set('page_size', '1');
    const data = await fetchJson(url.toString());
    if (data && typeof data === 'object') {
      if (Array.isArray((data as Json).results)) {
        const first = ((data as Json).results as unknown[])[0];
        if (first && typeof first === 'object') {
          return schemaFromSample(first);
        }
      }
      return schemaFromSample(data);
    }
  } catch (err) {
    console.error(`[sample] ${pathname} failed: ${(err as Error).message}`);
  }
  return null;
}

async function buildSpec() {
  const endpoints = await listEndpoints();
  const paths: Json = {};
  for (const endpoint of endpoints) {
    const pathname = pathFromUrl(endpoint);
    // We only describe GET list endpoints here for brevity
    const sampleSchema = await getSample(pathname);
    const tag = inferTag(pathname);
    const opId = operationId(pathname, 'GET');
    paths[pathname] = {
      get: {
        tags: [tag],
        summary: `List ${pathname}`,
        operationId: opId,
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' }, required: false },
          { name: 'page_size', in: 'query', schema: { type: 'integer' }, required: false },
          { name: 'cursor', in: 'query', schema: { type: 'string' }, required: false },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: sampleSchema ?? { type: 'object' },
              },
            },
          },
        },
      },
    };
    // be nice to the API
    await delay(100);
  }

  const spec: Json = {
    openapi: '3.0.3',
    info: {
      title: 'CourtListener REST API',
      version: 'v4',
      description: 'Auto-generated spec from live endpoints (list endpoints only).',
    },
    servers: [{ url: ensureTrailingSlash(API_BASE_URL), description: 'CourtListener' }],
    paths,
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(spec, null, 2), 'utf8');
  console.log(`OpenAPI spec written to ${OUTPUT_PATH}`);
}

buildSpec().catch((err) => {
  console.error(err);
  process.exit(1);
});
