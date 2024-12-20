# Rate Limiting Strategies

To ensure fair usage and protect the API from abuse, the Cosmic Ledger Core API implements rate limiting.

## Rate Limit Policy

- **Requests per minute**: 100 requests
- **Requests per hour**: 1000 requests

## Response Headers

When a request is rate-limited, the following headers will be included in the response:

- `X-RateLimit-Limit`: The maximum number of requests allowed in the current time window.
- `X-RateLimit-Remaining`: The number of requests remaining in the current time window.
- `X-RateLimit-Reset`: The time when the rate limit will reset (in UTC epoch time).

## Example Rate Limit Response

- HTTP/1.1 429 Too Many Requests
- X-RateLimit-Limit: 100
- X-RateLimit-Remaining: 0
- X-RateLimit-Reset: 1633036800
- Content-Type: application/json

```json
1 {
2   "error": {
3     "code": "RATE_LIMIT_EXCEEDED",
4     "message": "You have exceeded the number of allowed requests. Please try again later."
5   }
6 }
```
