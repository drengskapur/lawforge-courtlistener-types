import { z } from 'zod';

// =============================================================================
// Core API Response Schemas
// =============================================================================

export const CourtSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    full_name: z.string().optional(),
    abbreviation: z.string().optional(),
  })
  .passthrough(); // Allow additional fields from API

export const PersonSchema = z
  .object({
    id: z.number(),
    name: z.string().optional(),
    slug: z.string().optional(),
    positions: z.array(z.any()).optional(),
  })
  .passthrough();

export const OpinionClusterSchema = z
  .object({
    id: z.number(),
    case_name: z.string().nullable().optional(),
    case_name_short: z.string().nullable().optional(),
    date_filed: z.string().nullable().optional(),
    court: z.string().nullable().optional(),
    court_id: z.string().nullable().optional(),
    docket: z.union([z.string(), z.number()]).nullable().optional(),
    docket_id: z.number().nullable().optional(),
    citation_count: z.number().nullable().optional(),
    precedential_status: z.string().nullable().optional(),
  })
  .passthrough();

export const OpinionSchema = z
  .object({
    id: z.number(),
    cluster_id: z.number().nullable().optional(),
    cluster: z.union([z.string(), z.number()]).nullable().optional(),
    author_id: z.number().nullable().optional(),
    type: z.string().nullable().optional(),
    plain_text: z.string().nullable().optional(),
    html: z.string().nullable().optional(),
    html_with_citations: z.string().nullable().optional(),
    extracted_by_ocr: z.boolean().nullable().optional(),
  })
  .passthrough();

export const DocketSchema = z
  .object({
    id: z.number(),
    case_name: z.string().nullable().optional(),
    case_name_short: z.string().nullable().optional(),
    docket_number: z.string().nullable().optional(),
    court_id: z.string().nullable().optional(),
    date_filed: z.string().nullable().optional(),
    date_terminated: z.string().nullable().optional(),
    nature_of_suit: z.string().nullable().optional(),
  })
  .passthrough();

export const AudioSchema = z
  .object({
    id: z.number(),
    case_name: z.string().nullable().optional(),
    date_created: z.string().nullable().optional(),
    court_id: z.string().nullable().optional(),
    download_url: z.string().nullable().optional(),
  })
  .passthrough();

export const CitationSchema = z
  .object({
    id: z.number(),
    volume: z.number().nullable().optional(),
    reporter: z.string().nullable().optional(),
    page: z.string().nullable().optional(),
    type: z.number().nullable().optional(),
    cluster_id: z.number().nullable().optional(),
  })
  .passthrough();

export const SearchResultSchema = z
  .object({
    id: z.number().optional(),
    caseName: z.string().nullable().optional(),
    case_name: z.string().nullable().optional(),
    court: z.string().nullable().optional(),
    court_id: z.string().nullable().optional(),
    dateFiled: z.string().nullable().optional(),
    date_filed: z.string().nullable().optional(),
    docketNumber: z.string().nullable().optional(),
    citation: z.array(z.string()).nullable().optional(),
    snippet: z.string().nullable().optional(),
    absolute_url: z.string().nullable().optional(),
  })
  .passthrough();

// =============================================================================
// Paginated Response Schema Factory
// =============================================================================

export function paginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(itemSchema),
  });
}

// =============================================================================
// API Response Schemas
// =============================================================================

export const CourtsResponseSchema = paginatedSchema(CourtSchema);
export const PeopleResponseSchema = paginatedSchema(PersonSchema);
export const OpinionClustersResponseSchema = paginatedSchema(OpinionClusterSchema);
export const OpinionsResponseSchema = paginatedSchema(OpinionSchema);
export const DocketsResponseSchema = paginatedSchema(DocketSchema);
export const AudioResponseSchema = paginatedSchema(AudioSchema);

// Search response has a different structure
export const SearchResponseSchema = z
  .object({
    count: z.number(),
    next: z.string().nullable().optional(),
    previous: z.string().nullable().optional(),
    results: z.array(SearchResultSchema),
  })
  .passthrough();

// =============================================================================
// Type Inference (these should match index.d.ts)
// =============================================================================

export type Court = z.infer<typeof CourtSchema>;
export type Person = z.infer<typeof PersonSchema>;
export type OpinionCluster = z.infer<typeof OpinionClusterSchema>;
export type Opinion = z.infer<typeof OpinionSchema>;
export type Docket = z.infer<typeof DocketSchema>;
export type Audio = z.infer<typeof AudioSchema>;
export type Citation = z.infer<typeof CitationSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;

export type CourtsResponse = z.infer<typeof CourtsResponseSchema>;
export type PeopleResponse = z.infer<typeof PeopleResponseSchema>;
export type OpinionClustersResponse = z.infer<typeof OpinionClustersResponseSchema>;
export type OpinionsResponse = z.infer<typeof OpinionsResponseSchema>;
export type DocketsResponse = z.infer<typeof DocketsResponseSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
