# CloudCart Product Service

Initial API foundation for the Product Service. It currently uses in-memory product data; PostgreSQL integration will be added later.

## Start locally

```powershell
cd F:\DevOps\End-to-End-project\product-service
npm install
npm run dev
```

The service listens on `http://localhost:3001` by default.

## API endpoints

- `GET /health`
- `GET /api/products`
- `GET /api/products/:id`

## Verification

```powershell
npm test
npm run build
```
