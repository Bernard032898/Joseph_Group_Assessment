# Ticket API

A Node.js Express API for managing support tickets with a PostgreSQL database.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add database connection details:
     ```
     DB_HOST=localhost
     DB_USER=your_user
     DB_PASSWORD=your_password
     DB_NAME=tickets_db
     DB_PORT=5432
     ```

3. Start the server:
   ```bash
   npm run dev
   ```

   The API will run on `http://localhost:3000`

## API Endpoints

### Create Ticket
```
POST /tickets
Content-Type: application/json

{
  "title": "Issue title",
  "description": "Issue description",
  "priority": "High"
}
```

### Get All Tickets
```
GET /tickets
```

### Get Tickets with Filters
```
GET /tickets?priority=High&status=Open
```

### Get Tickets by Optional Filters
```
GET /tickets?status=Open&priority=High&title=login&description=error
```

Available filters:
- `status`
- `priority`
- `title`
- `description`

### Get Ticket by ID
```
GET /tickets/:id
```

### Update Ticket Status
```
PUT /tickets/:id/status
Content-Type: application/json

{
  "status": "Closed"
}
```

### Update Ticket Priority
```
PUT /tickets/:id/priority
Content-Type: application/json

{
  "priority": "Critical"
}
```

### Delete Ticket
```
DELETE /tickets/:id
```

## Testing with Postman

For detailed Postman testing guide including CRUD examples, see [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md).

### Quick Test

1. **Create a ticket:**
   ```bash
   curl -X POST http://localhost:3000/tickets \
     -H "Content-Type: application/json" \
     -d '{"title":"Test","description":"Test ticket","priority":"High"}'
   ```

2. **Get all tickets:**
   ```bash
   curl http://localhost:3000/tickets
   ```

3. **Update ticket status:**

   - **Bash / WSL / Git Bash:**
     ```bash
     curl -X PUT http://localhost:3000/tickets/1/status \
       -H "Content-Type: application/json" \
       -d '{"status":"Closed"}'
     ```

   - **Windows PowerShell:**
     ```powershell
     curl.exe -X PUT http://localhost:3000/tickets/1/status -H "Content-Type: application/json" -d '{"status":"Closed"}'
     ```

## Project Structure

```
api/
├── app.js                 # Express app setup
├── package.json          # Dependencies
├── config/
│   └── db.js            # Database connection
├── controllers/
│   └── ticketController.js   # Business logic
├── routes/
│   └── ticketRoutes.js      # Route definitions
└── POSTMAN_GUIDE.md     # Postman testing guide
```

## Database Schema

The `Tickets` table includes:
- `id` - Primary key (auto-increment)
- `title` - Ticket title
- `description` - Detailed description
- `priority` - Priority level (Low, Medium, High, Critical)
- `status` - Status (Open, In Progress, Closed)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Priority Levels

- `Low` - Non-urgent issues
- `Medium` - Standard priority
- `High` - Urgent issues
- `Critical` - System-breaking issues

## Status Values

- `Open` - New ticket
- `In Progress` - Being worked on
- `Closed` - Resolved

## Running Tests

Use Postman collection or curl commands to test all CRUD operations. See [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) for complete examples.

## Troubleshooting

### Cannot connect to database
- Verify PostgreSQL is running
- Check `.env` file credentials
- Ensure database exists

### Port 3000 already in use
- Kill the process: `lsof -ti:3000 | xargs kill -9` (macOS/Linux)
- Or use a different port in app.js

### Module not found errors
- Run `npm install` again
- Delete `node_modules` and reinstall

## Support

For detailed API testing examples and Postman setup, refer to [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md).
