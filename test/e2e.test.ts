import { describe, it, expect, beforeAll } from 'vitest';
import {
  CourtsResponseSchema,
  PeopleResponseSchema,
  OpinionClustersResponseSchema,
  OpinionsResponseSchema,
  DocketsResponseSchema,
  AudioResponseSchema,
  SearchResponseSchema,
} from './schemas';

const BASE_URL = 'https://www.courtlistener.com/api/rest/v4';
const API_TOKEN = process.env.COURTLISTENER_API_TOKEN;

async function fetchAPI(endpoint: string) {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (API_TOKEN) {
    headers.Authorization = `Token ${API_TOKEN}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, { headers });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

describe('CourtListener API e2e', () => {
  let apiReachable = true;

  beforeAll(async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      await fetch(`${BASE_URL}/courts/?page_size=1`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeout);
    } catch {
      apiReachable = false;
      console.warn('CourtListener API not reachable, skipping e2e tests');
    }
  });

  describe('Courts', () => {
    it('validates /courts/ response', async ({ skip }) => {
      if (!apiReachable) skip();

      const data = await fetchAPI('/courts/?page_size=5');
      const result = CourtsResponseSchema.safeParse(data);

      if (!result.success) {
        console.error('Validation errors:', JSON.stringify(result.error.issues, null, 2));
      }

      expect(result.success).toBe(true);
      expect(result.data?.results.length).toBeGreaterThan(0);
    });
  });

  describe('People', () => {
    it('validates /people/ response', async ({ skip }) => {
      if (!apiReachable) skip();

      const data = await fetchAPI('/people/?page_size=5');
      const result = PeopleResponseSchema.safeParse(data);

      if (!result.success) {
        console.error('Validation errors:', JSON.stringify(result.error.issues, null, 2));
      }

      expect(result.success).toBe(true);
      expect(result.data?.results.length).toBeGreaterThan(0);
    });
  });

  describe('Opinion Clusters', () => {
    it('validates /clusters/ response', async ({ skip }) => {
      if (!apiReachable) skip();

      const data = await fetchAPI('/clusters/?page_size=5');
      const result = OpinionClustersResponseSchema.safeParse(data);

      if (!result.success) {
        console.error('Validation errors:', JSON.stringify(result.error.issues, null, 2));
      }

      expect(result.success).toBe(true);
      expect(result.data?.results.length).toBeGreaterThan(0);
    });
  });

  describe('Opinions', () => {
    it('validates /opinions/ response', async ({ skip }) => {
      if (!apiReachable) skip();

      const data = await fetchAPI('/opinions/?page_size=5');
      const result = OpinionsResponseSchema.safeParse(data);

      if (!result.success) {
        console.error('Validation errors:', JSON.stringify(result.error.issues, null, 2));
      }

      expect(result.success).toBe(true);
      expect(result.data?.results.length).toBeGreaterThan(0);
    });
  });

  describe('Dockets', () => {
    it('validates /dockets/ response', async ({ skip }) => {
      if (!apiReachable) skip();

      const data = await fetchAPI('/dockets/?page_size=5');
      const result = DocketsResponseSchema.safeParse(data);

      if (!result.success) {
        console.error('Validation errors:', JSON.stringify(result.error.issues, null, 2));
      }

      expect(result.success).toBe(true);
      expect(result.data?.results.length).toBeGreaterThan(0);
    });
  });

  describe('Audio', () => {
    it('validates /audio/ response', async ({ skip }) => {
      if (!apiReachable) skip();

      const data = await fetchAPI('/audio/?page_size=5');
      const result = AudioResponseSchema.safeParse(data);

      if (!result.success) {
        console.error('Validation errors:', JSON.stringify(result.error.issues, null, 2));
      }

      expect(result.success).toBe(true);
      expect(result.data?.results.length).toBeGreaterThan(0);
    });
  });

  describe('Search', () => {
    it('validates /search/ response', async ({ skip }) => {
      if (!apiReachable) skip();

      const data = await fetchAPI('/search/?q=privacy&type=o&page_size=5');
      const result = SearchResponseSchema.safeParse(data);

      if (!result.success) {
        console.error('Validation errors:', JSON.stringify(result.error.issues, null, 2));
      }

      expect(result.success).toBe(true);
      expect(result.data?.results.length).toBeGreaterThan(0);
    });
  });
});
