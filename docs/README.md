# CourtListener TypeScript Definitions

Comprehensive TypeScript type definitions for the [CourtListener](https://www.courtlistener.com) legal research API.

## Installation

```bash
npm install @types/lawforge__courtlistener
# or
yarn add @types/lawforge__courtlistener
# or
pnpm add @types/lawforge__courtlistener
```

## Quick Start

```typescript
import type { Court, SearchResult, OpinionCluster } from '@types/lawforge__courtlistener';

// Use the types in your CourtListener API client
interface CourtListenerClient {
  search(query: string): Promise<SearchResult[]>;
  getCourt(id: string): Promise<Court>;
  getOpinionCluster(id: number): Promise<OpinionCluster>;
}
```

## API Reference

Browse the complete API reference:

- [Courts](courts.md) - Federal and state court information
- [Search Results](search.md) - Case search and metadata
- [Opinions](opinions.md) - Court opinions and texts
- [Dockets](dockets.md) - Case filing information
- [Clusters](clusters.md) - Opinion clusters and citations

## Type Safety

These definitions provide full TypeScript support with:

- ✅ Complete API coverage
- ✅ Optional properties where appropriate
- ✅ Union types for enumerated values
- ✅ Proper null/undefined handling
- ✅ Zod schema validation support

## Contributing

Found an issue or want to contribute? See our [Contributing Guide](../CONTRIBUTING.md).

## License

MIT © [LawForge](https://github.com/drengskapur)
