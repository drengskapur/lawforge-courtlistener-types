# Security Policy

## Supported Versions

We take security seriously. This project provides TypeScript type definitions and does not contain runtime code that could introduce security vulnerabilities. However, we maintain security best practices and respond to reports.

Currently supported versions for security updates:

- **Latest version** - Full support
- **Previous major version** - Security fixes only
- **Older versions** - Not supported

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

- **Email**: [security contact email]
- **Subject**: `[SECURITY] Vulnerability in @types/lawforge__courtlistener`

### What to Include

When reporting a security vulnerability, please include:

1. **Description**: A clear description of the vulnerability
2. **Impact**: What an attacker could achieve by exploiting this vulnerability
3. **Steps to Reproduce**: Detailed steps to reproduce the issue
4. **Affected Versions**: Which versions are affected
5. **Mitigation**: Any workarounds or fixes you've identified
6. **Contact Information**: How we can reach you for follow-up

### Our Response Process

1. **Acknowledgment**: We'll acknowledge receipt within 48 hours
2. **Investigation**: We'll investigate the report and determine impact
3. **Updates**: We'll provide regular updates on our progress
4. **Fix**: We'll develop and test a fix
5. **Disclosure**: We'll coordinate disclosure timing with you
6. **Release**: We'll release the fix and security advisory

We follow responsible disclosure practices and will credit you (if desired) in our security advisory.

## Security Considerations

### For Consumers

When using these type definitions:

1. **Runtime Security**: These are type definitions only - actual security depends on your runtime implementation
2. **Data Validation**: Consider using runtime validation (like Zod) in addition to TypeScript types
3. **API Security**: Follow CourtListener's security best practices when making API calls

### For Contributors

When contributing to this project:

1. **Dependency Scanning**: All dependencies are scanned for known vulnerabilities
2. **Code Review**: All changes undergo security-focused code review
3. **Minimal Dependencies**: We keep dependencies to a minimum to reduce attack surface
4. **Automated Updates**: Dependencies are automatically updated via Renovate

## Known Security Considerations

### Type-Only Package

This is a type-only package that ships no runtime JavaScript code. The primary security considerations are:

- **Supply Chain Attacks**: Dependencies are monitored via automated tools
- **Malicious Type Definitions**: All changes are reviewed to ensure type safety
- **Build Process**: The package build process is transparent and auditable

### API-Related Security

While this package defines types for the CourtListener API, actual API security is handled by:

- CourtListener's API authentication and authorization
- HTTPS/TLS encryption for API calls
- Your application's secure handling of API credentials

## Security Updates

Security updates will be released as patch versions with high priority. Subscribe to our releases to stay informed.

## Contact

For security-related questions or concerns:

- **Security Issues**: Use the reporting process above
- **General Questions**: [contact information]

Thank you for helping keep the TypeScript ecosystem secure!
