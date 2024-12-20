# API Endpoints

This document lists all available API endpoints for the Cosmic Ledger Core platform.

## Base URL

  https://api.cosmicledger.com/v1


## Authentication
All endpoints require authentication via Bearer Token.

## Endpoints

### User Management

- **POST /users/register**
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    1 {
    2   "username": "string",
    3   "email": "string",
    4   "password": "string"
    5 }
    ```
  - **Response**:
    - **201 Created**: User registered successfully.
    - **400 Bad Request**: Validation errors.

- **POST /users/login**
  - **Description**: Log in an existing user.
  - **Request Body**:
    ```json
    1 {
    2   "email": "string",
    3   "password": "string"
    4 }
    ```
  - **Response**:
    - **200 OK**: Login successful, returns user data and token.
    - **401 Unauthorized**: Invalid credentials.

### Transactions

- **POST /transactions**
  - **Description**: Create a new transaction.
  - **Request Body**:
    ```json
    1 {
    2   "from": "string",
    3   "to": "string",
    4   "amount": "number",
    5   "currency": "string"
    6 }
    ```
  - **Response**:
    - **201 Created**: Transaction created successfully.
    - **400 Bad Request**: Validation errors.

- **GET /transactions/{id}**
  - **Description**: Retrieve a transaction by ID.
  - **Response**:
    - **200 OK**: Returns transaction details.
    - **404 Not Found**: Transaction not found.

### Staking

- **POST /staking**
  - **Description**: Stake tokens.
  - **Request Body**:
    ```json
    1 {
    2   "userId": "string",
    3   "amount": "number"
    4 }
    ```
  - **Response**:
    - **201 Created**: Staking successful.
    - **400 Bad Request**: Validation errors.

### Governance

- **POST /governance/vote**
  - **Description**: Cast a vote in a governance proposal.
  - **Request Body**:
    ```json
    1 {
    2   "proposalId": "string",
    3   "vote": "boolean"
    4 }
    ```
  - **Response**:
    - **200 OK**: Vote cast successfully.
    - **400 Bad Request**: Validation errors.
    
