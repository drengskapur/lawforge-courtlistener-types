# Search Results

Full-text search across millions of court cases.

## SearchResult

```typescript
interface SearchResult {
  id?: number;
  case_name?: string;
  caseName?: string;
  court?: string;
  court_id?: string;
  date_filed?: string;
  dateFiled?: string;
  citation?: string[];
  citation_count?: number;
  cluster_id?: number;
  court_citation_string?: string;
  caseNameShort?: string;
  docketNumber?: string;
  suitNature?: string;
  cause?: string;
  nature_of_suit?: string;
  status?: string;
  jurisdiction?: string;
  region?: string;
  division?: string;
  subtype?: string;
  terminating_date_filed?: string;
  date_terminated?: string;
  date_last_filing?: string;
  assigned_to_str?: string;
  referred_to_str?: string;
  slug?: string;
  absolute_url?: string;
}
```

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number?` | Unique case identifier |
| `case_name` | `string?` | Full case name |
| `court_id` | `string?` | Court identifier |
| `date_filed` | `string?` | Filing date (ISO 8601) |
| `citation` | `string[]?` | Case citations |
| `citation_count` | `number?` | Times cited |
| `docketNumber` | `string?` | Docket number |
| `status` | `string?` | Case status |

!!! info "Field naming"
    The API returns both snake_case (`case_name`) and camelCase (`caseName`) variants for compatibility.

## Endpoints

### Search

```http
GET /api/rest/v4/search/?q={query}
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | `string` | Search query (required) |
| `court` | `string` | Filter by court ID |
| `date_filed_after` | `string` | Minimum filing date |
| `date_filed_before` | `string` | Maximum filing date |
| `page` | `number` | Page number |
| `page_size` | `number` | Results per page (max 100) |

## Examples

### Basic Search

```typescript
import type { SearchResult, PaginatedResponse } from '@types/lawforge__courtlistener';

async function search(query: string): Promise<SearchResult[]> {
  const url = new URL('https://www.courtlistener.com/api/rest/v4/search/');
  url.searchParams.set('q', query);

  const res = await fetch(url);
  const data: PaginatedResponse<SearchResult> = await res.json();
  return data.results;
}

const cases = await search('first amendment');
```

### Filtered Search

```typescript
interface SearchOptions {
  query: string;
  court?: string;
  afterDate?: string;
  limit?: number;
}

async function searchFiltered(opts: SearchOptions): Promise<SearchResult[]> {
  const url = new URL('https://www.courtlistener.com/api/rest/v4/search/');
  url.searchParams.set('q', opts.query);

  if (opts.court) url.searchParams.set('court', opts.court);
  if (opts.afterDate) url.searchParams.set('date_filed_after', opts.afterDate);
  if (opts.limit) url.searchParams.set('page_size', String(opts.limit));

  const res = await fetch(url);
  const data: PaginatedResponse<SearchResult> = await res.json();
  return data.results;
}

// Supreme Court cases from 2020 onwards
const cases = await searchFiltered({
  query: 'constitutional',
  court: 'scotus',
  afterDate: '2020-01-01',
  limit: 25
});
```

### Citation Analysis

```typescript
function getMostCited(results: SearchResult[]): SearchResult | undefined {
  return results.reduce((max, curr) =>
    (curr.citation_count ?? 0) > (max?.citation_count ?? 0) ? curr : max
  , results[0]);
}

const cases = await search('landmark decision');
const mostCited = getMostCited(cases);

console.log(`${mostCited?.case_name}: ${mostCited?.citation_count} citations`);
```

## Related

- [Opinions](opinions.md) — Opinion clusters
- [Courts](courts.md) — Court information
- [Utility Types](types.md#casestatus) — Status values
