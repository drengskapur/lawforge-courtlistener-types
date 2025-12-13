# Opinions

Court opinions with full text and metadata.

## Opinion

Individual judicial opinion.

```typescript
interface Opinion {
  id: number;
  author_id?: number | null;
  author?: string;
  author_str?: string;
  per_curiam?: boolean;
  joined_by?: any[];
  joined_by_str?: string;
  type?: string;
  sha1?: string;
  page_count?: number;
  download_url?: string;
  local_path?: string;
  plain_text?: string;
  html?: string;
  html_lawbox?: string;
  html_columbia?: string;
  xml_harvard?: string;
  html_with_citations?: string;
  extracted_by_ocr?: boolean;
  opinions_cited?: any[];
  cluster_id?: number;
  cluster?: string;
  absolute_url?: string;
}
```

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number` | Unique opinion identifier |
| `author_str` | `string?` | Author name |
| `per_curiam` | `boolean?` | Per curiam opinion |
| `type` | `string?` | Opinion type code |
| `plain_text` | `string?` | Plain text content |
| `html` | `string?` | HTML formatted content |
| `cluster_id` | `number?` | Parent cluster ID |

## OpinionCluster

Group of related opinions (e.g., majority + dissent).

```typescript
interface OpinionCluster {
  id: number;
  case_name?: string;
  case_name_short?: string;
  date_filed?: string;
  date_filed_is_approximate?: boolean;
  slug?: string;
  case_name_full?: string;
  scdb_id?: string;
  scdb_decision_direction?: number;
  scdb_votes_majority?: number;
  scdb_votes_minority?: number;
  source?: string;
  procedural_history?: string;
  attorneys?: string;
  nature_of_suit?: string;
  posture?: string;
  syllabus?: string;
  citation_count?: number;
  precedential_status?: string;
  date_blocked?: string;
  blocked?: boolean;
  court_id?: string;
  court?: string;
  docket_id?: number;
  docket?: string | number;
}
```

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number` | Cluster identifier |
| `case_name` | `string?` | Case name |
| `date_filed` | `string?` | Decision date |
| `citation_count` | `number?` | Times cited |
| `precedential_status` | `string?` | Published/Unpublished |
| `court_id` | `string?` | Court identifier |
| `docket_id` | `number?` | Related docket |

## Endpoints

### Get Opinion

```http
GET /api/rest/v4/opinions/{id}/
```

```typescript
import type { Opinion } from '@types/lawforge__courtlistener';

async function getOpinion(id: number): Promise<Opinion> {
  const res = await fetch(
    `https://www.courtlistener.com/api/rest/v4/opinions/${id}/`,
    { headers: { Authorization: `Token ${TOKEN}` } }
  );
  return res.json();
}

const opinion = await getOpinion(12345);
console.log(opinion.plain_text?.substring(0, 500));
```

### Get Opinion Cluster

```http
GET /api/rest/v4/clusters/{id}/
```

```typescript
import type { OpinionCluster } from '@types/lawforge__courtlistener';

async function getCluster(id: number): Promise<OpinionCluster> {
  const res = await fetch(
    `https://www.courtlistener.com/api/rest/v4/clusters/${id}/`,
    { headers: { Authorization: `Token ${TOKEN}` } }
  );
  return res.json();
}

const cluster = await getCluster(67890);
console.log(`${cluster.case_name} - ${cluster.citation_count} citations`);
```

## Text Formats

Opinions are available in multiple formats:

| Property | Format | Description |
|----------|--------|-------------|
| `plain_text` | Plain | Raw text extraction |
| `html` | HTML | Basic HTML formatting |
| `html_lawbox` | HTML | Lawbox processing |
| `html_columbia` | HTML | Columbia Law School |
| `xml_harvard` | XML | Harvard XML format |
| `html_with_citations` | HTML | With linked citations |

## Example

```typescript
import type { Opinion, OpinionCluster } from '@types/lawforge__courtlistener';

async function getFullOpinion(clusterId: number): Promise<{
  cluster: OpinionCluster;
  opinions: Opinion[];
}> {
  const API = 'https://www.courtlistener.com/api/rest/v4';

  const [clusterRes, opinionsRes] = await Promise.all([
    fetch(`${API}/clusters/${clusterId}/`, { headers }),
    fetch(`${API}/opinions/?cluster=${clusterId}`, { headers })
  ]);

  const cluster: OpinionCluster = await clusterRes.json();
  const { results: opinions } = await opinionsRes.json();

  return { cluster, opinions };
}

const { cluster, opinions } = await getFullOpinion(12345);

// Find majority opinion
const majority = opinions.find(o => o.type === '020lead');
```

## Related

- [Utility Types](types.md#opiniontype) — Opinion type codes
- [Utility Types](types.md#precedentialstatus) — Published status
- [Dockets](dockets.md) — Related docket information
