# Installation
> `npm install --save @types/lawforge__courtlistener`

# Summary
This package contains type definitions for [CourtListener API](https://www.courtlistener.com/api/) (https://www.courtlistener.com/api/).

# Details
Files were exported from https://github.com/drengskapur/lawforge

### Additional Details
- Dependencies: none
- Optional dependencies: none

# Credits
These definitions were written by [LawForge](https://github.com/drengskapur/lawforge).

# Usage

```typescript
import type {
  Court,
  Opinion,
  Person,
  CourtsResponse,
  ApiCourt
} from "@types/lawforge__courtlistener";

// Use with CourtListener API responses
const court: Court = {
  id: "us",
  name: "Supreme Court of the United States",
  full_name: "Supreme Court of the United States",
  abbreviation: "SCOTUS"
};

// Use with API response types
const response: CourtsResponse = await fetchCourts();
```

# API Coverage

This package provides TypeScript types for:

- **Courts** - Federal and state court information
- **Opinions** - Full court opinion texts and metadata
- **People** - Judges, attorneys, and court personnel
- **Dockets** - Case information and filings
- **Citations** - Legal citation networks
- **Search Results** - Search API responses

# Development

This package includes development tools for maintaining type accuracy:

```bash
# Generate fresh OpenAPI spec from CourtListener API
npm run generate-openapi
```

The generated OpenAPI specification in `tools/openapi/` is used to ensure type definitions match the actual API responses.

# Contributing

This is a type definition package for the CourtListener API. The types are maintained to match the official CourtListener API.

For issues with the CourtListener API itself, please see the [CourtListener API documentation](https://www.courtlistener.com/api/).

For issues with these type definitions, please report them in the [LawForge repository](https://github.com/drengskapur/lawforge).