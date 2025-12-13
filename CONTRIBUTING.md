# Contributing to @types/lawforge__courtlistener

Thank you for your interest in contributing to the TypeScript type definitions for the CourtListener API! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Type Definition Guidelines](#type-definition-guidelines)

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager
- Git

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/drengskapur/lawforge-courtlistener-types.git
   cd lawforge-courtlistener-types
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify setup:**
   ```bash
   npm run test
   npm run lint
   ```

## Development Workflow

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes following our guidelines**

3. **Test your changes:**
   ```bash
   npm run test
   npm run lint
   npm run format
   ```

4. **Update documentation if needed**

5. **Commit using conventional format:**
   ```bash
   git commit -m "feat: add new Court type properties"
   ```

### Type Definition Guidelines

#### Adding New Types

1. **Validate against CourtListener API:**
   - Check the official CourtListener API documentation
   - Use the OpenAPI generator: `npm run generate-openapi`
   - Test against real API responses

2. **Follow TypeScript conventions:**
   - Use interfaces for object types
   - Use union types for enums/flags
   - Mark optional properties with `?:`
   - Provide JSDoc comments for complex types

3. **Maintain backwards compatibility:**
   - Don't remove existing properties
   - Use union types for new optional fields
   - Consider deprecation notices for breaking changes

#### Example:

```typescript
/**
 * Court information from CourtListener API
 */
export interface Court {
  /** Unique court identifier */
  id: string;
  /** Court name (optional in some contexts) */
  name?: string;
  /** Full court name */
  full_name?: string;
  /** Court abbreviation */
  abbreviation?: string;
}
```

### Testing

#### Unit Tests

Run the test suite:
```bash
npm run test
```

#### Manual Testing

Test your changes against real CourtListener API usage:

```typescript
import type { Court } from "@types/lawforge__courtlistener";

// Test compilation
const court: Court = {
  id: "us",
  name: "Supreme Court",
  full_name: "Supreme Court of the United States",
  abbreviation: "SCOTUS"
};
```

### Submitting Changes

1. **Ensure all tests pass:**
   ```bash
   npm run test && npm run lint
   ```

2. **Update CHANGELOG.md** if needed

3. **Create a Pull Request:**
   - Use the PR template
   - Provide clear description of changes
   - Reference related issues

4. **Wait for review** and address feedback

### Commit Message Guidelines

We follow [Conventional Commits](https://conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

Examples:
```
feat(types): add new Court properties
fix: correct Person interface optional fields
docs: update installation instructions
```

## Maintenance Tasks

### Updating for New API Versions

When CourtListener releases a new API version:

1. Update `package.json` version to match API version
2. Run `npm run generate-openapi` to get latest schema
3. Update type definitions accordingly
4. Add migration notes for breaking changes

### Dependency Updates

Dependencies are managed by Renovate. For manual updates:

```bash
npm update
npm run test
```

## Questions?

- **API Issues:** Check [CourtListener API documentation](https://www.courtlistener.com/api/)
- **Type Issues:** Open a [GitHub issue](https://github.com/drengskapur/lawforge-courtlistener-types/issues)
- **General Questions:** Use [GitHub Discussions](https://github.com/drengskapur/lawforge-courtlistener-types/discussions)

Thank you for contributing to better TypeScript support for the CourtListener API! 🎉
