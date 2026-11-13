# CloudCart Customer Service

Customer management microservice built with Express and TypeScript.

## Port
3003

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /api/customers | List customers |
| GET | /api/customers/:id | Get customer |
| POST | /api/customers | Create customer |

## Development

npm install
npm run dev

## Build and tests

npm run build
npm test

Customer data is currently stored in memory for development.
