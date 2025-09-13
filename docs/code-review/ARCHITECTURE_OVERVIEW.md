## Architecture Overview (High‑Level)

```
[Client]
  React 19 + Vite + Tailwind
        |
        v
[Backend API]
  Node.js (Express) + Mongoose
        |         \
        |          \__ Stripe (Payments)
        |
        \__ MongoDB (Products)
        \
         \__ Cloudinary (Images)

Auth: Auth0 (SPA) handles login on the client. Backend trusts frontend for public product reads and processes payments via Stripe PaymentIntent.
```

### Key Flows
- Products: React → `GET /api/products[?category=...]` → MongoDB via Mongoose
- Checkout: React (Stripe Elements) → Backend `POST /api/create-payment-intent` → Stripe
- Images (admin/dev utility): React/Tool → Backend `POST /api/upload-image` → Cloudinary

### Important Docs
- Frontend: `../FRONTEND.md`
- Backend: `../BACKEND.md`
- API Reference: `../API.md`
- Deployment: `../DEPLOYMENT.md`











