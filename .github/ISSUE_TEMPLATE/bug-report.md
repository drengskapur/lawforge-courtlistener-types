---
name: Bug Report
about: Report a bug or incorrect type definition
title: "[BUG] "
labels: bug
assignees: ''
---

## Bug Report

**Describe the bug**
A clear and concise description of what the bug is.

**TypeScript Version**
What version of TypeScript are you using?
```bash
tsc --version
```

**Node.js Version**
What version of Node.js are you using?
```bash
node --version
```

**Package Version**
What version of `@types/lawforge__courtlistener` are you using?
```bash
npm list @types/lawforge__courtlistener
```

**Code Example**
Provide a minimal code example that reproduces the issue:
```typescript
import type { Court } from "@types/lawforge__courtlistener";

// This should work but doesn't
const court: Court = {
  // ...
};
```

**Expected behavior**
A clear and concise description of what you expected to happen.

**Actual behavior**
What actually happened instead.

**Additional context**
Add any other context about the problem here, such as:
- CourtListener API version you're targeting
- Specific endpoint or data structure
- Any workarounds you've found
