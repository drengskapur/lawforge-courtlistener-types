# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run test` - Type check the TypeScript definitions (runs `tsc --noEmit`)
- `npm run lint` - Lint code using Biome
- `npm run format` - Format code using Biome (add `--check` to verify formatting)
- `npm run build` - Build TypeScript declarations (runs `tsc`)

### Maintenance

- `npm run generate-openapi` - Fetch latest CourtListener API schema and generate OpenAPI spec in `tools/openapi/`

### CI/CD

- `npm run prepublishOnly` - Runs automatically before npm publish (builds and tests)

## Architecture

This is a TypeScript type definitions package for the CourtListener legal API. The repository follows the DefinitelyTyped conventions for type packages:

- **index.d.ts**: Single declaration file containing all type definitions for the CourtListener API v4
- **tools/scripts/generate-openapi.ts**: TypeScript script that fetches live API endpoints and generates OpenAPI schema for validation
- **Biome**: Used for linting and formatting instead of ESLint/Prettier

### Key Type Categories

The types are organized around CourtListener's main resources:

- Courts (federal/state court information)
- Opinions (court opinion texts and metadata)
- OpinionClusters (groups of related opinions)
- People (judges, attorneys, court personnel)
- Dockets (case information and filings)
- SearchResults (search API responses)
- Citations (legal citation networks)

### Testing Strategy

Type checking serves as the primary validation:

1. TypeScript compiler validates type definitions (`npm run test`)
2. OpenAPI generation script validates against live API (`npm run generate-openapi`)
3. CI runs type checking on Node 18.x and 20.x

## Important Notes

- This package publishes only `index.d.ts` as specified in the `files` field
- The package follows the `@types/` naming convention as `@types/lawforge__courtlistener`
- Types use optional properties (`?`) extensively since CourtListener API responses vary by endpoint
- The OpenAPI spec in `tools/openapi/` helps ensure types match actual API responses
