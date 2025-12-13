# CourtListener TypeScript Types

Type-safe access to millions of court opinions and legal documents.

## Installation

```bash
npm install @types/lawforge__courtlistener
```

## Usage

```typescript
import type { Court, Opinion, SearchResult } from '@types/lawforge__courtlistener';

const response = await fetch('https://www.courtlistener.com/api/rest/v4/courts/scotus/');
const court: Court = await response.json();

console.log(court.full_name); // "Supreme Court of the United States"
```

## What's Included

| Type | Description |
|------|-------------|
| [Courts](courts.md) | Federal, state, and specialized court metadata |
| [Search Results](search.md) | Case search responses and filtering |
| [Opinions](opinions.md) | Judicial opinions and clusters |
| [Dockets](dockets.md) | Case filings and docket entries |
| [Citations](citations.md) | Citation lookups and networks |
| [Utility Types](types.md) | Enums, IDs, and helper types |

## Features

- **Complete Coverage** — All CourtListener API v4 endpoints
- **Strict Types** — Accurate optional/required properties
- **Documentation** — JSDoc comments on every property
- **Modern** — ESM-first, TypeScript 4.8+

## Requirements

- TypeScript 4.8 or higher
- Node.js 18 or higher

## Links

- [CourtListener API](https://www.courtlistener.com/api/rest/v4/)
- [GitHub Repository](https://github.com/drengskapur/lawforge-courtlistener-types)
- [npm Package](https://www.npmjs.com/package/@types/lawforge__courtlistener)
