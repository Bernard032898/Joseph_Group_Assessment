# Ticket API

A Node.js + Express REST API for managing support tickets backed by PostgreSQL.

## Setup

### Prerequisites
- Node.js 14 or higher
- PostgreSQL installed and running
- `npm` available

### Install dependencies
```bash
cd api
npm install
```

### Database requirements
The API expects a PostgreSQL database named `helpdesk_ticket_system` on `localhost:5432`.
The current database connection is set in `api/config/db.js`:
- user: `postgres`
- password: `M5rch@281998!`
- database: `helpdesk_ticket_system`

If your database credentials differ, update `api/config/db.js`.

### Run the API
```bash
npm run dev
```

Or run without nodemon:
```bash
npm start
```

The server listens on port `3000` by default. You can override it with `PORT`.

## How to run
1. Start PostgreSQL.
2. Make sure the database is created and seeded using the SQL files in `sql/`.
3. From `api/`, install dependencies and start the application.
4. The API will be available at `http://localhost:3000`.

## Endpoints
- `GET /tickets` — list tickets
- `GET /tickets/:id` — get a ticket by ID
- `POST /tickets` — create a ticket
- `PUT /tickets/:id/status` — update ticket status
- `PUT /tickets/:id/priority` — update ticket priority
- `DELETE /tickets/:id` — delete a ticket

### Example payload for create
```json
{
  "title": "Issue title",
  "description": "Issue details",
  "priority": "High"
}
```

## Notes and assumptions
- The API uses hardcoded DB connection settings in `api/config/db.js`.
- `dotenv` is installed but `config/db.js` does not currently load `.env` values.
- CORS is enabled for all origins by default.
- If you use a different port or DB host, update `app.js` and `config/db.js`.
- The app expects PostgreSQL on `localhost:5432`.

## Test cases and validation
1. **List tickets**
  - Request: `GET http://localhost:3000/tickets`
  - Expected: HTTP 200 response and a JSON array.
2. **Create a ticket**
  - Request: `POST http://localhost:3000/tickets`
  - Payload: `{"title":"Test","description":"Test ticket","priority":"High"}`
  - Expected: HTTP 201 created and returned object includes an `id`.
3. **Get ticket by ID**
  - Request: `GET http://localhost:3000/tickets/:id`
  - Expected: HTTP 200 for an existing ID, HTTP 404 for a missing ID.
4. **Update ticket status**
  - Request: `PUT http://localhost:3000/tickets/:id/status`
  - Payload: `{"status":"Closed"}`
  - Expected: HTTP 200 and updated `status` field equals `Closed`.
5. **Delete ticket**
  - Request: `DELETE http://localhost:3000/tickets/:id`
  - Expected: HTTP 200 or 204 and follow-up `GET /tickets/:id` returns 404.

### Validation checks
- Confirm the API returns JSON payloads for success and error cases.
- Confirm `priority` uses one of `Low`, `Medium`, `High`, `Critical`.
- Confirm `status` uses one of `Open`, `In Progress`, `Closed`.
- Use the Postman collection in `api/PostmanCollection/JosephGroup_Collection.postman_collection.json` or `api/POSTMAN_GUIDE.md` to exercise CRUD behavior.

## Quick test commands
```bash
curl -X GET http://localhost:3000/tickets
curl -X POST http://localhost:3000/tickets -H "Content-Type: application/json" -d '{"title":"Test","description":"Test ticket","priority":"High"}'
```

## Folder structure
```
api/
├── app.js
├── package.json
├── config/db.js
├── controllers/ticketController.js
├── routes/ticketRoutes.js
└── POSTMAN_GUIDE.md
```
