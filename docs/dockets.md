# Dockets

Case docket information and procedural records.

## Docket

```typescript
interface Docket {
  id: number;
  case_name?: string | null;
  case_name_short?: string | null;
  docket_number?: string | null;
  court_id?: string | null;
  date_filed?: string | null;
  date_terminated?: string | null;
  nature_of_suit?: string | null;
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number` | Unique docket identifier |
| `case_name` | `string?` | Full case name |
| `case_name_short` | `string?` | Abbreviated case name |
| `docket_number` | `string?` | Official docket number |
| `court_id` | `string?` | Court identifier |
| `date_filed` | `string?` | Filing date (ISO 8601) |
| `date_terminated` | `string?` | Termination date |
| `nature_of_suit` | `string?` | Case category |

## Endpoints

### List Dockets

```http
GET /api/rest/v4/dockets/
```

```typescript
import type { Docket, PaginatedResponse } from '@types/lawforge__courtlistener';

async function listDockets(court: string): Promise<Docket[]> {
  const url = new URL('https://www.courtlistener.com/api/rest/v4/dockets/');
  url.searchParams.set('court', court);
  url.searchParams.set('page_size', '50');

  const res = await fetch(url, { headers });
  const data: PaginatedResponse<Docket> = await res.json();
  return data.results;
}

const dockets = await listDockets('scotus');
```

### Get Docket

```http
GET /api/rest/v4/dockets/{id}/
```

```typescript
import type { Docket } from '@types/lawforge__courtlistener';

async function getDocket(id: number): Promise<Docket> {
  const res = await fetch(
    `https://www.courtlistener.com/api/rest/v4/dockets/${id}/`,
    { headers }
  );
  return res.json();
}

const docket = await getDocket(12345);
console.log(`${docket.case_name} (${docket.docket_number})`);
```

## Example

### Find Active Cases

```typescript
import type { Docket, PaginatedResponse } from '@types/lawforge__courtlistener';

async function getActiveCases(court: string): Promise<Docket[]> {
  const dockets: Docket[] = [];
  let url: string | null = 'https://www.courtlistener.com/api/rest/v4/dockets/';
  url += `?court=${court}`;

  while (url) {
    const res = await fetch(url, { headers });
    const data: PaginatedResponse<Docket> = await res.json();

    // Filter to active cases (no termination date)
    const active = data.results.filter(d => !d.date_terminated);
    dockets.push(...active);

    url = data.next;
  }

  return dockets;
}

const activeCases = await getActiveCases('cadc');
console.log(`Found ${activeCases.length} active cases`);
```

### Group by Nature of Suit

```typescript
function groupByNature(dockets: Docket[]): Map<string, Docket[]> {
  const groups = new Map<string, Docket[]>();

  for (const docket of dockets) {
    const nature = docket.nature_of_suit ?? 'Unknown';
    const existing = groups.get(nature) ?? [];
    groups.set(nature, [...existing, docket]);
  }

  return groups;
}

const dockets = await listDockets('nyed');
const grouped = groupByNature(dockets);

for (const [nature, cases] of grouped) {
  console.log(`${nature}: ${cases.length} cases`);
}
```

## Related

- [Utility Types](types.md) — Docket identifier type
- [Courts](courts.md) — Court information
- [Opinions](opinions.md) — Related opinions