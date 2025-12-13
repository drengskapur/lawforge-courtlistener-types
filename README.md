# lawforge-courtlistener-types

TypeScript definitions for the [CourtListener API](https://www.courtlistener.com/api/).

## Installation

```bash
npm install lawforge-courtlistener-types
```

## Usage

```typescript
import type {
  Court,
  Opinion,
  Person,
  CourtsResponse,
  ApiCourt
} from "lawforge-courtlistener-types";

const court: Court = {
  id: "us",
  name: "Supreme Court of the United States",
  full_name: "Supreme Court of the United States",
  abbreviation: "SCOTUS"
};

const response: CourtsResponse = await fetchCourts();
```

## API Coverage

- **Courts** - Federal and state court information
- **Opinions** - Full court opinion texts and metadata
- **People** - Judges, attorneys, and court personnel
- **Dockets** - Case information and filings
- **Citations** - Legal citation networks
- **Search Results** - Search API responses

## Development

```bash
# Generate fresh OpenAPI spec from CourtListener API
npm run generate-openapi
```

The generated OpenAPI specification in `tools/openapi/` is used to ensure type definitions match the actual API responses.

## Contributing

For issues with these type definitions, please [open an issue](https://github.com/drengskapur/lawforge-courtlistener-types/issues).

For issues with the CourtListener API itself, see the [CourtListener API documentation](https://www.courtlistener.com/api/).

## License

MIT
