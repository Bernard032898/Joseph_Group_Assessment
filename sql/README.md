# SQL Setup for PostgreSQL

This guide explains how to set up the PostgreSQL database for the Ticket API using the SQL files in this repository.

## Files in this folder

- `schema.sql`: creates the `Tickets` table.
- `sampledata.sql`: inserts sample ticket data into the `Tickets` table.
- `samplequery.sql`: example queries for validating the data.

## Prerequisites

- PostgreSQL installed and running
- Access to `psql` or pgAdmin
- A PostgreSQL user with privileges to create databases

## Step 1: Create the database

Open a terminal or PowerShell, then run:

```powershell
psql -U postgres
```

If you use a different PostgreSQL user, replace `postgres` with your username.

At the `psql` prompt, create the database:

```sql
CREATE DATABASE helpdesk_ticket_system;
```

If you want to use a dedicated user, run:

```sql
CREATE USER ticket_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE helpdesk_ticket_system TO ticket_user;
```

## Step 2: Create the table schema

Connect to the new database:

```sql
\c helpdesk_ticket_system
```

Then import the schema file:

```sql
\i 'C:/Users/DELL/Documents/Joseph Group Assessment/Joseph_Group_Assessment/sql/schema.sql'
```

This creates the `Tickets` table with fields:

- `id`
- `title`
- `description`
- `priority`
- `status`
- `created_at`

## Step 3: Load sample data

From the same `psql` session, run:

```sql
\i 'C:/Users/DELL/Documents/Joseph Group Assessment/Joseph_Group_Assessment/sql/sampledata.sql'
```

This inserts sample tickets into the `Tickets` table.

## Step 4: Verify the setup

Run these checks:

```sql
SELECT COUNT(*) FROM Tickets;
SELECT * FROM Tickets LIMIT 5;
```

You can also use the example queries in `samplequery.sql`:

```sql
\i 'C:/Users/DELL/Documents/Joseph Group Assessment/Joseph_Group_Assessment/sql/samplequery.sql'
```

## Step 5: Match the API configuration

The API uses the database connection values in `api/config/db.js`:

- `host`: `localhost`
- `database`: `helpdesk_ticket_system`
- `user`: `postgres`
- `password`: `M5rch@281998!`
- `port`: `5432`

If you changed the database user or password, update `api/config/db.js` accordingly.

## Optional: Use pgAdmin

If you prefer pgAdmin:

1. Create the database `helpdesk_ticket_system`.
2. Open the Query Tool.
3. Run the SQL from `schema.sql`.
4. Run the SQL from `sampledata.sql`.

## Notes

- Use the full path to the SQL files when running `\i` from `psql`.
- If you rename the database or user, update the API database config.
- The API expects PostgreSQL to be reachable at `localhost:5432`.
