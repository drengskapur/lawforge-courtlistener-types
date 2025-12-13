# lawforge-courtlistener-types

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm version](https://img.shields.io/npm/v/lawforge-courtlistener-types.svg?style=flat-square)](https://www.npmjs.com/package/lawforge-courtlistener-types)

TypeScript definitions for the [CourtListener API](https://www.courtlistener.com/api/).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install

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

## API

This package provides TypeScript types for:

- **Courts** - Federal and state court information
- **Opinions** - Full court opinion texts and metadata
- **People** - Judges, attorneys, and court personnel
- **Dockets** - Case information and filings
- **Citations** - Legal citation networks
- **Search Results** - Search API responses

## Contributing

PRs accepted.

For issues with these type definitions, please [open an issue](https://github.com/drengskapur/lawforge-courtlistener-types/issues).

For issues with the CourtListener API itself, see the [CourtListener API documentation](https://www.courtlistener.com/api/).

## License

[MIT](LICENSE) © LawForge
