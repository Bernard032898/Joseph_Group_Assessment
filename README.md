# Joseph Group Assessment

This repository contains the Joseph Group Assessment project with multiple components.

## Project Overview

This project includes:

1. **dotnet-task** - A .NET console application for employee data processing
   - Reads employee data from CSV files
   - Displays employee statistics organized by department
   - See [dotnet-task/README.md](dotnet-task/README.md) for setup instructions

2. **API** - Node.js Express ticket management system
   - RESTful API for managing support tickets
   - PostgreSQL database backend
   - Full CRUD operations with Postman integration
   - See [api/README.md](api/README.md) for setup and testing

## Prerequisites

### For dotnet-task:
- **Git**: For cloning the repository
  - [Download Git](https://git-scm.com/download/win)
- **.NET SDK 10.0 or higher**
  - [Download .NET SDK](https://dotnet.microsoft.com/download)

### For API:
# Joseph Group Assessment

This repository contains the Joseph Group Assessment project. This top-level README summarizes setup, run steps, test scenarios and links for each component:

- `api/` — Ticket API (Node.js + Express)
- `frontend/` — React + Vite UI
- `dotnet-task/` — .NET console utility
- `sql/` — PostgreSQL schema and sample data
- `api/PostmanCollection/` — Postman collection for API testing

Use the per-component READMEs for full details; quick links are below.

## Quick Links
- API: [api/README.md](api/README.md)
- Frontend: [frontend/README.md](frontend/README.md)
- dotnet task: [dotnet-task/README.md](dotnet-task/README.md)
- SQL: [sql/README.md](sql/README.md)
- Postman collection: `api/PostmanCollection/JosephGroup_Collection.postman_collection.json`

## Quick Setup Summary

1) Prepare the database (PostgreSQL):

```powershell
psql -U postgres -c "CREATE DATABASE helpdesk_ticket_system;"
psql -U postgres -d helpdesk_ticket_system -f "sql/schema.sql"
psql -U postgres -d helpdesk_ticket_system -f "sql/sampledata.sql"
```

2) Start the API:

```bash
cd api
npm install
npm run dev
```

3) Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

4) Run the dotnet utility (optional):

```powershell
cd dotnet-task
dotnet restore
dotnet run
```

## Test scenarios and validation (summary)

- API: see `api/README.md` for CRUD test cases. Quick checks:
  - `GET /tickets` returns 200 and JSON array
  - `POST /tickets` returns 201 and created ticket with `id`
  - `PUT /tickets/:id/status` updates status to `Closed`

- Frontend: see `frontend/README.md` for UI tests. Quick checks:
  - App loads in browser (Vite)
  - Create ticket form validates input and submits
  - Ticket list loads and filtering works

- dotnet-task: see `dotnet-task/README.md` for test cases. Quick checks:
  - `dotnet run` prints correct totals for sample CSV
  - Missing CSV prints `employees.csv not found.`

- SQL: see `sql/README.md` for schema and query validation. Quick checks:
  - `schema.sql` creates `Tickets` table
  - `sampledata.sql` inserts sample rows
  - `samplequery.sql` creates views

## Postman

Import `api/PostmanCollection/JosephGroup_Collection.postman_collection.json` into Postman. See `api/POSTMAN_GUIDE.md` for collection instructions and environment variables.

## Project structure

```
Joseph_Group_Assessment/
├── api/
│   ├── README.md
│   ├── POSTMAN_GUIDE.md
│   ├── PostmanCollection/
│   │   └── JosephGroup_Collection.postman_collection.json
│   ├── app.js
│   └── config/
├── frontend/
│   ├── README.md
│   └── src/
├── dotnet-task/
│   ├── README.md
│   └── Program.cs
├── sql/
│   ├── README.md
│   ├── schema.sql
│   └── sampledata.sql
└── README.md
```

## Notes and assumptions

- The `api/config/db.js` file currently contains the database connection values used by the API. If your DB credentials differ, update that file or modify the API to use environment variables.
- The frontend expects the API at `http://localhost:3000` by default. Use `frontend/.env` with `VITE_API_URL` to change it.

## Troubleshooting

- If the API fails to start, confirm PostgreSQL is running and the `helpdesk_ticket_system` database exists.
- If the frontend cannot load data, confirm the API is reachable and `VITE_API_URL` is correct.
- If `dotnet` is not found, install the .NET SDK and restart your terminal.

---

If you want, I can add a short script or single command to start the whole stack locally (API + frontend) using concurrently or a PowerShell script. Let me know which you prefer.
```
=== Employee Statistics ===

Total Employees: 8

Employees By Department:
Finance: 1
HR: 1
IT: 1
Legal: 1
Marketing: 1
Operations: 1
Sales: 1
Support: 1
```

**Validation**: ✓ All departments listed | ✓ Sorted alphabetically | ✓ Correct counts

---

### How to Run Test Cases

1. For each test case, replace the contents of `employees.csv` with the test data provided
2. Run `dotnet run`
3. Verify the output matches the expected output
4. Check all validation points pass

**Pro Tip**: Save different versions of the CSV file (e.g., `test1.csv`, `test2.csv`) and copy them to `employees.csv` to quickly switch between test scenarios.

## Project Structure

```
dotnet-task/
├── Program.cs           # Main application code
├── employees.csv        # Employee data (CSV format)
├── dotnet-task.csproj   # Project configuration
└── bin/                 # Compiled output (generated)
```

## Troubleshooting

### Issue: ".NET SDK not found"
- **Solution**: Install .NET SDK 10.0 or higher from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)

### Issue: "employees.csv not found"
- **Solution**: Ensure you're running the application from the `dotnet-task` directory where `employees.csv` is located

### Issue: Build fails
- **Solution**: Run `dotnet clean` followed by `dotnet restore`, then rebuild with `dotnet build`

### Issue: CSV parsing errors
- **Solution**: Verify the `employees.csv` file format matches the expected structure (comma-separated values with proper headers)

## Technical Details

- **Language**: C#
- **.NET Version**: .NET 10.0
- **Application Type**: Console Application
- **Key Features**:
  - Reads employee data from CSV file
  - Parses employee records
  - Groups employees by department
  - Displays sorted statistics

---

## API Documentation

### 2. Ticket Management API

**Purpose:** RESTful API for managing support tickets

**Features:**
- Create new tickets
- View all tickets with filtering
- Update ticket status
- Filter by priority and status
- PostgreSQL database persistence

**Technology:** Node.js, Express, PostgreSQL

**Port:** 3000

### API Setup

```bash
cd api
npm install
npm run dev
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tickets` | Create a new ticket |
| GET | `/tickets` | Get all tickets (with optional filters) |
| PUT | `/tickets/:id/status` | Update ticket status |

### Create Ticket (POST)

```bash
POST http://localhost:3000/tickets
Content-Type: application/json

{
  "title": "Login Issue",
  "description": "Users cannot login to the system",
  "priority": "high"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Login Issue",
  "description": "Users cannot login to the system",
  "priority": "high",
  "status": "open",
  "created_at": "2026-06-12T10:30:00.000Z"
}
```

### Get All Tickets (GET)

```bash
GET http://localhost:3000/tickets
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Login Issue",
    "description": "Users cannot login to the system",
    "priority": "high",
    "status": "open",
    "created_at": "2026-06-12T10:30:00.000Z"
  }
]
```

### Get Tickets with Filters (GET)

```bash
GET http://localhost:3000/tickets?priority=high&status=open
```

**Query Parameters:**
- `priority` - Filter by priority (low, medium, high, critical)
- `status` - Filter by status (open, in_progress, pending, closed)

### Update Ticket Status (PUT)

```bash
PUT http://localhost:3000/tickets/1/status
Content-Type: application/json

{
  "status": "closed"
}
```

**Valid Statuses:** open, in_progress, pending, closed

### Testing with Postman

For complete Postman testing guide with examples, see [api/POSTMAN_GUIDE.md](api/POSTMAN_GUIDE.md).

**Key Features:**
- 10+ test case scenarios
- Complete CRUD examples
- Postman collection JSON for import
- Filtering examples
- Error handling examples

### Quick Postman Tests

1. **Create Ticket:**
   - Method: POST
   - URL: `http://localhost:3000/tickets`
   - Body: `{"title":"Test","description":"Test ticket","priority":"high"}`

2. **Get All Tickets:**
   - Method: GET
   - URL: `http://localhost:3000/tickets`

3. **Filter by Priority:**
   - Method: GET
   - URL: `http://localhost:3000/tickets?priority=high`

4. **Update Status:**
   - Method: PUT
   - URL: `http://localhost:3000/tickets/1/status`
   - Body: `{"status":"closed"}`

### API Troubleshooting

**Cannot connect to port 3000:**
- Verify API is running with `npm run dev`
- Check if another process is using port 3000

**Database connection error:**
- Verify PostgreSQL is running
- Check `.env` file database credentials
- Ensure database exists

**JSON parse errors:**
- Verify Content-Type header is set to `application/json`
- Check JSON syntax in request body

## Support

For issues or questions:
1. Check the troubleshooting section for your component
2. Refer to component-specific README files:
   - [dotnet-task/README.md](dotnet-task/README.md)
   - [api/README.md](api/README.md)
   - [api/POSTMAN_GUIDE.md](api/POSTMAN_GUIDE.md)
3. Contact the development team

