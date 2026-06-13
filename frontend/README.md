# Frontend - Ticket UI

This is a small React + Vite frontend for the Ticket API.

Features:
- Ticket list (Title, Priority, Status, Created Date)
- Optional filter by Status
- Create ticket form with validation (Title required, Priority 1-3)
- Priority mapping: 1 -> Low, 2 -> Medium, 3 -> High

Run locally:

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:3000` by default or any host available. You can override with a Vite env variable `VITE_API_URL`.
