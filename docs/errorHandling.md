# Error Handling Strategies

The Cosmic Ledger Core API uses standard HTTP status codes to indicate the success or failure of an API request.

## Common Status Codes

- **200 OK**: The request was successful.
- **201 Created**: A resource was successfully created.
- **400 Bad Request**: The request was invalid or cannot be processed.
- **401 Unauthorized**: Authentication failed or token is missing/invalid.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An unexpected error occurred on the server.

## Error Response Format

All error responses follow a standard format:

```json
1 {
2   "error": {
3     "code": "error_code",
4     "message": "A description of the error."
5   }
6 }
```

## Example Error Response

```json
1 {
2   "error": {
3     "code": "INVALID_CREDENTIALS",
4     "message": "The email or password provided is incorrect ."
5   }
6 }
```
