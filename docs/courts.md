# Courts

Federal, state, and specialized court information.

## Court

```typescript
interface Court {
  id: string;
  name?: string;
  full_name?: string;
  abbreviation?: string;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique court identifier (e.g., `"scotus"`, `"ca9"`) |
| `name` | `string?` | Short court name |
| `full_name` | `string?` | Complete official name |
| `abbreviation` | `string?` | Standard abbreviation (e.g., `"SCOTUS"`) |

## Endpoints

### List Courts

```http
GET /api/rest/v4/courts/
```

```typescript
import type { PaginatedResponse, Court } from '@types/lawforge__courtlistener';

const res = await fetch('https://www.courtlistener.com/api/rest/v4/courts/');
const data: PaginatedResponse<Court> = await res.json();

console.log(data.count); // Total courts
console.log(data.results); // Array of Court
```

### Get Court

```http
GET /api/rest/v4/courts/{id}/
```

```typescript
import type { Court } from '@types/lawforge__courtlistener';

const res = await fetch('https://www.courtlistener.com/api/rest/v4/courts/scotus/');
const court: Court = await res.json();

console.log(court.full_name); // "Supreme Court of the United States"
```

## Common Court IDs

### Supreme Court

| ID | Court |
|----|-------|
| `scotus` | Supreme Court of the United States |

### Federal Circuit Courts

| ID | Court |
|----|-------|
| `ca1` | First Circuit |
| `ca2` | Second Circuit |
| `ca3` | Third Circuit |
| `ca4` | Fourth Circuit |
| `ca5` | Fifth Circuit |
| `ca6` | Sixth Circuit |
| `ca7` | Seventh Circuit |
| `ca8` | Eighth Circuit |
| `ca9` | Ninth Circuit |
| `ca10` | Tenth Circuit |
| `ca11` | Eleventh Circuit |
| `cadc` | D.C. Circuit |
| `cafc` | Federal Circuit |

### Federal District Courts

| ID | Court |
|----|-------|
| `dcd` | District of Columbia |
| `nyed` | Eastern District of New York |
| `sdny` | Southern District of New York |
| `cacd` | Central District of California |
| `txed` | Eastern District of Texas |

## Example

```typescript
import type { Court, PaginatedResponse } from '@types/lawforge__courtlistener';

async function getFederalCourts(): Promise<Court[]> {
  const courts: Court[] = [];
  let url: string | null = 'https://www.courtlistener.com/api/rest/v4/courts/';

  while (url) {
    const res = await fetch(url);
    const data: PaginatedResponse<Court> = await res.json();
    courts.push(...data.results);
    url = data.next;
  }

  return courts.filter(c => c.id?.startsWith('ca') || c.id === 'scotus');
}
```

## Related

- [Utility Types](types.md#jurisdiction) — Jurisdiction type codes
