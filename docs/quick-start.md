# Quick Start

Get started with CourtListener types in 5 minutes.

## Install

=== "npm"
    ```bash
    npm install @types/lawforge__courtlistener
    ```

=== "yarn"
    ```bash
    yarn add @types/lawforge__courtlistener
    ```

=== "pnpm"
    ```bash
    pnpm add @types/lawforge__courtlistener
    ```

## Basic Example

```typescript
import type { Court, SearchResult, PaginatedResponse } from '@types/lawforge__courtlistener';

const API_BASE = 'https://www.courtlistener.com/api/rest/v4';

// Fetch a court
async function getCourt(id: string): Promise<Court> {
  const res = await fetch(`${API_BASE}/courts/${id}/`);
  return res.json();
}

// Search cases
async function search(query: string): Promise<SearchResult[]> {
  const res = await fetch(`${API_BASE}/search/?q=${encodeURIComponent(query)}`);
  const data: PaginatedResponse<SearchResult> = await res.json();
  return data.results;
}
```

## With Authentication

Most endpoints require an API token:

```typescript
const TOKEN = process.env.COURTLISTENER_API_TOKEN;

const headers = {
  'Authorization': `Token ${TOKEN}`,
  'Content-Type': 'application/json',
};

const res = await fetch(`${API_BASE}/opinions/12345/`, { headers });
```

!!! info "Get your API token"
    Visit [courtlistener.com/api/](https://www.courtlistener.com/api/) to get your API token.

## Paginated Responses

All list endpoints return paginated responses:

```typescript
import type { PaginatedResponse, Opinion } from '@types/lawforge__courtlistener';

async function getAllOpinions(): Promise<Opinion[]> {
  const all: Opinion[] = [];
  let url: string | null = `${API_BASE}/opinions/`;

  while (url) {
    const res = await fetch(url, { headers });
    const data: PaginatedResponse<Opinion> = await res.json();
    all.push(...data.results);
    url = data.next;
  }

  return all;
}
```

## Type Guards

Create type guards for runtime validation:

```typescript
import type { Court } from '@types/lawforge__courtlistener';

function isCourt(data: unknown): data is Court {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    typeof (data as Court).id === 'string'
  );
}

const response = await fetch(`${API_BASE}/courts/scotus/`);
const data = await response.json();

if (isCourt(data)) {
  console.log(data.full_name); // TypeScript knows this is Court
}
```

## Next Steps

- [Courts API](courts.md) — Court metadata and identifiers
- [Search API](search.md) — Full-text case search
- [Opinions API](opinions.md) — Opinion text and metadata
