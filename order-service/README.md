# CloudCart Order Service

A Node.js, Express, and TypeScript microservice for managing customer orders.

## Port
3002

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /api/orders | List orders |
| GET | /api/orders/:id | Get an order |
| POST | /api/orders | Create an order |

## Local development

```bash
npm install
npm run dev
```

## Build and test

```bash
npm run build
npm test
```

Order data is currently stored in memory for development.
