# Authentication Methods

The Cosmic Ledger Core API uses token-based authentication. All requests to the API must include a valid Bearer token in the Authorization header.

## Obtaining a Token

1. **Register a User**: Use the `/users/register` endpoint to create a new user account.
2. **Log In**: Use the `/users/login` endpoint to authenticate and receive a token.

## Example Request

- **POST** /users/login HTTP/1.1
- **Host**: api.cosmicledger.com
- **Content-Type**: application/json

```json
1 {
2   "email": "user@example.com",
3   "password": "yourpassword"
4 }
```

## Example Response

```json
1 {
2   "token": "your_jwt_token",
3   "user": {
4     "id": "user_id",
5     "username": "username",
6     "email": "user@example.com"
7   }
8 }
```

## Token Expiration
Tokens expire after 24 hours. You will need to log in again to obtain a new token.
