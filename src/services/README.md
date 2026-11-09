# Service boundary

The UI currently imports mock data from this folder. When backend services are ready, replace these exports with API client modules without changing the dashboard components:

- `productService.ts` for Product Service requests
- `orderService.ts` for Order Service requests
- `customerService.ts` for Customer Service requests

Keep request/response types close to each service and expose stable functions such as `listProducts()` and `listOrders()` to the UI.
