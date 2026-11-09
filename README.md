# CloudCart

CloudCart is a modern SaaS e-commerce frontend for a DevOps capstone portfolio. It is built with React, TypeScript, Vite, and modern CSS.

## What is included

- Responsive dashboard shell with sidebar and top navigation
- Revenue, orders, and product metrics
- Customer analytics and customer directory
- Product catalog with search and category filtering
- Product quick view/detail panel
- Interactive shopping cart drawer with quantity controls
- Recent orders dashboard table and full order management view
- Typed mock data that is ready to be replaced by backend service calls
- No backend, Docker, Kubernetes, or deployment configuration

## Run locally

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## Frontend structure

```text
CloudCart/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Bundled image and static assets
│   ├── App.tsx             # CloudCart page shell and reusable view components
│   ├── services/
│   │   ├── mockData.ts     # Typed mock Product, Order, and Customer data
│   │   └── README.md       # Product/Order Service integration boundary
│   ├── App.css             # Component and responsive layout styling
│   ├── index.css           # Global reset, typography, and design base
│   └── main.tsx            # React application entry point
├── index.html              # Vite HTML entry
├── package.json            # Scripts and frontend dependencies
├── tsconfig*.json          # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

The current UI intentionally keeps the initial capstone surface compact while still separating reusable UI functions such as `ProductCard`, `StatCard`, `OrderRow`, `ProductDetail`, and `CartDrawer`. As the product grows, these can move into `src/components/`, with the following service-ready additions:

```text
src/
├── components/             # Shared UI primitives and feature components
├── features/
│   ├── catalog/             # Product listing, filters, and product types
│   ├── orders/              # Order tables and order types
│   └── cart/                # Cart state and cart UI
├── services/                # API clients per future backend/microservice
├── types/                   # Shared API contracts
└── lib/                     # Formatting, constants, and client utilities
```

This keeps the frontend independent from backend services while leaving a clear seam for catalog, order, customer, and payment APIs later.
