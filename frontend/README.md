# Frontend - Ticket UI

A React + Vite frontend for the Ticket API.

## Setup

### Prerequisites
- Node.js 16 or higher
- npm available

### Install dependencies
```bash
cd frontend
npm install
```

## Run

```bash
npm run dev
```

Then open the local URL shown in the terminal (typically `http://localhost:5173`).

## API configuration

The frontend sends requests to an API base URL defined by `VITE_API_URL`.
- Default: `http://localhost:3000`
- To override, create `frontend/.env` and set:
  ```env
  VITE_API_URL=http://localhost:3000
  ```

If the API runs on a different host or port, update `VITE_API_URL` and restart Vite.

## How to use
- View the ticket list on the `Tickets` page.
- Filter results by status.
- Create a ticket on the `Create Ticket` page.
- Close tickets from the ticket list.

## Notes and assumptions
- Priority is selected as 1, 2, or 3 and mapped to Low / Medium / High.
- The UI uses the Ticket API endpoints on `localhost:3000` by default.
- The app does not currently support editing ticket fields other than closing tickets.
- Start the API before using the frontend.

## Build

To create a production build:
```bash
npm run build
```

## Test cases and validation
1. **Start frontend**
  - Run: `npm run dev`
  - Expected: Vite opens and the app loads in the browser.
2. **Ticket list fetch**
  - Expected: ticket data loads from the API and displays rows.
3. **Create ticket**
  - Fill the form and submit.
  - Expected: success message and the ticket list refreshes.
4. **Filter by status**
  - Select a status filter.
  - Expected: ticket list updates to show matching tickets.
5. **Close ticket**
  - Click `Resolve` on an open ticket.
  - Expected: ticket updates to `Closed` and refreshes.

### Validation
- Confirm the frontend uses `VITE_API_URL` or defaults to `http://localhost:3000`.
- Confirm the API is running before using the frontend.
- Confirm form validation prevents empty title and invalid priority values.
- Confirm the UI shows error messages if the backend request fails.

## Files
- `src/App.jsx` — main application
- `src/pages/TicketList.jsx` — ticket list and filter page
- `src/pages/CreateTicket.jsx` — ticket creation form
- `src/main.jsx` — app entry point
- `src/styles.css` — styling
