# API Versioning Strategy

The Cosmic Ledger Core API follows a versioning strategy to ensure backward compatibility and smooth transitions for users.

## Versioning Scheme

- The API version is included in the URL as a prefix: `/v1/`
- Major version changes (e.g., v1 to v2) may introduce breaking changes.
- Minor version changes (e.g., v1.1 to v1.2) will include new features but maintain backward compatibility.

## Deprecation Policy

- Deprecated endpoints will be marked in the documentation.
- Users will be given at least 6 months' notice before an endpoint is removed.
- A deprecation notice will be included in the response headers for deprecated endpoints.

## Example of a Versioned Endpoint

GET /v1/users HTTP/1.1
Host: api.cosmicledger.com
