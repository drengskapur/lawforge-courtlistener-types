# Citations

Citation parsing, validation, and network analysis.

## CitationLookup

Parsed citation reference.

```typescript
interface CitationLookup {
  id: number;
  volume?: number;
  reporter?: string;
  page?: string;
  type?: number;
  cluster_id?: number;
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number` | Citation identifier |
| `volume` | `number?` | Reporter volume number |
| `reporter` | `string?` | Reporter abbreviation (e.g., "U.S.") |
| `page` | `string?` | Starting page number |
| `type` | `number?` | Citation type code |
| `cluster_id` | `number?` | Linked opinion cluster |

## OpinionCited

Citation relationship between opinions.

```typescript
interface OpinionCited {
  id: number;
  citing_opinion_id?: number;
  cited_opinion_id?: number;
  citing_opinion?: string | number;
  cited_opinion?: string | number;
  depth?: number | string;
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number` | Relationship identifier |
| `citing_opinion_id` | `number?` | Opinion that cites |
| `cited_opinion_id` | `number?` | Opinion being cited |
| `depth` | `number \| string?` | Citation depth/treatment |

## Endpoints

### Citation Lookup

```http
GET /api/rest/v4/citations/
```

```typescript
import type { CitationLookup, PaginatedResponse } from '@types/lawforge__courtlistener';

async function lookupCitation(
  volume: number,
  reporter: string,
  page: string
): Promise<CitationLookup | null> {
  const url = new URL('https://www.courtlistener.com/api/rest/v4/citations/');
  url.searchParams.set('volume', String(volume));
  url.searchParams.set('reporter', reporter);
  url.searchParams.set('page', page);

  const res = await fetch(url, { headers });
  const data: PaginatedResponse<CitationLookup> = await res.json();

  return data.results[0] ?? null;
}

// Look up "347 U.S. 483" (Brown v. Board of Education)
const citation = await lookupCitation(347, 'U.S.', '483');
console.log(`Cluster ID: ${citation?.cluster_id}`);
```

### Citations to Opinion

```http
GET /api/rest/v4/opinions-cited/?cited_opinion={id}
```

```typescript
import type { OpinionCited, PaginatedResponse } from '@types/lawforge__courtlistener';

async function getCitingOpinions(opinionId: number): Promise<OpinionCited[]> {
  const url = new URL('https://www.courtlistener.com/api/rest/v4/opinions-cited/');
  url.searchParams.set('cited_opinion', String(opinionId));

  const res = await fetch(url, { headers });
  const data: PaginatedResponse<OpinionCited> = await res.json();
  return data.results;
}

const citations = await getCitingOpinions(12345);
console.log(`Cited by ${citations.length} opinions`);
```

## Examples

### Citation Network

```typescript
import type { OpinionCited } from '@types/lawforge__courtlistener';

interface CitationNetwork {
  opinionId: number;
  citedBy: number[];
  cites: number[];
}

async function buildNetwork(opinionId: number): Promise<CitationNetwork> {
  const API = 'https://www.courtlistener.com/api/rest/v4';

  const [citedByRes, citesRes] = await Promise.all([
    fetch(`${API}/opinions-cited/?cited_opinion=${opinionId}`, { headers }),
    fetch(`${API}/opinions-cited/?citing_opinion=${opinionId}`, { headers })
  ]);

  const citedByData = await citedByRes.json();
  const citesData = await citesRes.json();

  return {
    opinionId,
    citedBy: citedByData.results.map((c: OpinionCited) => c.citing_opinion_id),
    cites: citesData.results.map((c: OpinionCited) => c.cited_opinion_id)
  };
}

const network = await buildNetwork(12345);
console.log(`Cites ${network.cites.length} opinions`);
console.log(`Cited by ${network.citedBy.length} opinions`);
```

### Parse Citation String

```typescript
function parseCitation(str: string): { volume: number; reporter: string; page: string } | null {
  // Match patterns like "347 U.S. 483" or "123 F.3d 456"
  const match = str.match(/^(\d+)\s+([A-Za-z.]+\d*[A-Za-z.]*)\s+(\d+)$/);

  if (!match) return null;

  return {
    volume: parseInt(match[1]),
    reporter: match[2],
    page: match[3]
  };
}

const parsed = parseCitation('347 U.S. 483');
if (parsed) {
  const citation = await lookupCitation(parsed.volume, parsed.reporter, parsed.page);
  console.log(citation);
}
```

## Related

- [Opinions](opinions.md) — Opinion clusters
- [Utility Types](types.md) — Citation identifier type
