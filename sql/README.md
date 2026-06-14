# SQL Setup for PostgreSQL

This folder contains the SQL files required to prepare the database used by the Ticket API.

## Files
- `schema.sql` — creates the `Tickets` table.
- `sampledata.sql` — inserts sample ticket rows.
- `samplequery.sql` — example views and validation queries.

## Prerequisites
- PostgreSQL installed and running
- `psql` available, or a SQL client such as pgAdmin
- A PostgreSQL user with permission to create a database and tables

## Setup

### 1. Create the database
Open a terminal or PowerShell and run:
```powershell
psql -U postgres -c "CREATE DATABASE helpdesk_ticket_system;"
```
If you use a different PostgreSQL user, replace `postgres` with your username.

### 2. Create the schema
Import `schema.sql` into the new database:
```powershell
psql -U postgres -d helpdesk_ticket_system -f "sql/schema.sql"
```

### 3. Load sample data
Import `sampledata.sql`:
```powershell
psql -U postgres -d helpdesk_ticket_system -f "sql/sampledata.sql"
```

### 4. Verify the database
Run these commands:
```powershell
psql -U postgres -d helpdesk_ticket_system -c "SELECT COUNT(*) FROM Tickets;"
psql -U postgres -d helpdesk_ticket_system -c "SELECT * FROM Tickets LIMIT 5;"
```

### 5. (Optional) Use `samplequery.sql`
Load the example views and queries:
```powershell
psql -U postgres -d helpdesk_ticket_system -f "sql/samplequery.sql"
```

## Table details
The `Tickets` table defined by `schema.sql` includes:
- `id` — serial primary key
- `title` — required text
- `description` — optional text
- `priority` — required, values: `Low`, `Medium`, `High`, `Critical`
- `status` — required, values: `Open`, `In Progress`, `Closed`
- `created_at` — timestamp defaulting to `CURRENT_TIMESTAMP`

## Notes and assumptions
- The API expects `helpdesk_ticket_system` on `localhost:5432`.
- `api/config/db.js` currently uses hardcoded credentials.
- If your database user/password differ, update `api/config/db.js`.
- Use full paths in `psql` if you run commands from outside the repository.
- If PostgreSQL is not running, start it before importing the SQL files.
- `samplequery.sql` creates views for open tickets, counts by priority, and most recent tickets.

## Common commands
```powershell
psql -U postgres -d helpdesk_ticket_system -f "sql/schema.sql"
psql -U postgres -d helpdesk_ticket_system -f "sql/sampledata.sql"
psql -U postgres -d helpdesk_ticket_system -f "sql/samplequery.sql"
```

## API connection reminder
The API reads from the local PostgreSQL database using `api/config/db.js`.
Update this file if you change host, port, database name, user, or password.

## Test cases and validation
1. **Schema creation**
	- Run: `psql -U postgres -d helpdesk_ticket_system -f "sql/schema.sql"`
	- Expected: `CREATE TABLE` completes without error.
2. **Load sample data**
	- Run: `psql -U postgres -d helpdesk_ticket_system -f "sql/sampledata.sql"`
	- Expected: rows are inserted successfully.
3. **Verify row count**
	- Run: `psql -U postgres -d helpdesk_ticket_system -c "SELECT COUNT(*) FROM Tickets;"`
	- Expected: returns a positive integer (for sample data, 20 rows).
4. **Verify sample queries**
	- Run: `psql -U postgres -d helpdesk_ticket_system -f "sql/samplequery.sql"`
	- Expected: views are created without error.

### Validation
- Confirm the `Tickets` table exists with the expected columns.
- Confirm `priority` and `status` constraints are enforced.
- Confirm sample rows exist with valid `status` and `priority` values.
- Confirm the database name and credentials match `api/config/db.js`.
