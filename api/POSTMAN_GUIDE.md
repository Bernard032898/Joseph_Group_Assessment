# Postman Guide for Ticket API - CRUD Operations

This guide provides step-by-step instructions to test all CRUD operations on the Ticket API using Postman.

## Table of Contents
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [CRUD Operations](#crud-operations)
- [Postman Collection](#postman-collection)

---

## Setup

### 1. Verify API is Running

Before starting with Postman, ensure the API is running:

```powershell
cd Joseph_Group_Assessment\api
npm run dev
```

Expected output:
```
Server running on port 3000
```

### 2. Install Postman

Download and install [Postman](https://www.postman.com/downloads/) if not already installed.

### 3. Create Environment Variables (Optional)

In Postman:
1. Click **Environments** (left sidebar)
2. Click **Create**
3. Name: `Ticket API Dev`
4. Add variable:
   - Key: `BASE_URL`
   - Value: `http://localhost:3000`
5. Save

---

## API Endpoints

The API runs on `http://localhost:3000` with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tickets` | Create a new ticket |
| GET | `/tickets` | Get all tickets (with optional filters) |
| GET | `/tickets/:id` | Get a ticket by ID |
| PUT | `/tickets/:id/status` | Update ticket status |
| DELETE | `/tickets/:id` | Delete a ticket |

---

## CRUD Operations

### 1. CREATE - Add a New Ticket

**Endpoint:** `POST http://localhost:3000/tickets`

**Request Body:**
```json
{
  "title": "Login Issue",
  "description": "Users cannot login to the system",
  "priority": "High"
}
```

**Steps in Postman:**
1. Create a new request (click **+** tab)
2. Select **POST** method
3. Enter URL: `http://localhost:3000/tickets`
4. Click **Body** tab
5. Select **raw** and **JSON**
6. Paste the request body above
7. Click **Send**

**Expected Response (201):**
```json
{
  "id": 1,
  "title": "Login Issue",
  "description": "Users cannot login to the system",
  "priority": "High",
  "status": "Open",
  "created_at": "2026-06-12T10:30:00.000Z"
}
```

**Example Requests - Try These:**

**Example 1 - High Priority Bug:**
```json
{
  "title": "Database Connection Failed",
  "description": "API cannot connect to PostgreSQL database",
  "priority": "Critical"
}
```

**Example 2 - Low Priority Feature Request:**
```json
{
  "title": "Add Dark Mode",
  "description": "Users are requesting a dark mode option",
  "priority": "Low"
}
```

**Example 3 - Medium Priority Bug:**
```json
{
  "title": "Slow Report Generation",
  "description": "Reports take too long to generate",
  "priority": "Medium"
}
```

---

### 2. READ - Get All Tickets

**Endpoint:** `GET http://localhost:3000/tickets`

**Steps in Postman:**
1. Create a new request
2. Select **GET** method
3. Enter URL: `http://localhost:3000/tickets`
4. Click **Send**

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "title": "Login Issue",
    "description": "Users cannot login to the system",
    "priority": "High",
    "status": "Open",
    "created_at": "2026-06-12T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Database Connection Failed",
    "description": "API cannot connect to PostgreSQL database",
    "priority": "Critical",
    "status": "Open",
    "created_at": "2026-06-12T10:31:00.000Z"
  }
]
```

---

### 3. READ - Get Ticket by ID

**Endpoint:** `GET http://localhost:3000/tickets/:id`

**Steps in Postman:**
1. Create a new request
2. Select **GET** method
3. Enter URL: `http://localhost:3000/tickets/1` (replace `1` with the actual ticket ID)
4. Click **Send**

**Expected Response (200):**
```json
{
  "id": 1,
  "title": "Login Issue",
  "description": "Users cannot login to the system",
  "priority": "High",
  "status": "Open",
  "created_at": "2026-06-12T10:30:00.000Z"
}
```

---

### 4. READ - Get Tickets with Filters

**Query Parameters:**
- `status` - Filter by status (e.g., `Open`, `In Progress`, `Closed`)
- `priority` - Filter by priority (e.g., `Low`, `Medium`, `High`, `Critical`)
- `title` - Search ticket title (partial match)
- `description` - Search ticket description (partial match)

**Example URLs:**

**Get All High Priority Tickets:**
```
GET http://localhost:3000/tickets?priority=High
```

**Get All Open Tickets:**
```
GET http://localhost:3000/tickets?status=Open
```

**Search by Title:**
```
GET http://localhost:3000/tickets?title=login
```

**Search by Description:**
```
GET http://localhost:3000/tickets?description=error
```

**Combined Filters:**
```
GET http://localhost:3000/tickets?status=Open&priority=High&title=login&description=error
```

**Steps in Postman:**
1. Create a new GET request
2. Enter URL: `http://localhost:3000/tickets`
3. Click **Params** tab
4. Add parameters:
   - Key: `priority`, Value: `High`
   - Key: `status`, Value: `Open`
   - Key: `title`, Value: `login`
   - Key: `description`, Value: `error`
5. Click **Send**

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Login Issue",
    "priority": "High",
    "status": "Open",
    "description": "Users cannot login to the system",
    "created_at": "2026-06-12T10:30:00.000Z"
  }
]
```

---

### 5. DELETE - Remove a Ticket

**Endpoint:** `DELETE http://localhost:3000/tickets/:id`

**URL Parameter:**
- `id` - The ticket ID to delete

**Steps in Postman:**
1. Create a new request
2. Select **DELETE** method
3. Enter URL: `http://localhost:3000/tickets/1` (replace `1` with actual ticket ID)
4. Click **Send**

**Expected Response (200):**
```json
{
  "message": "Ticket deleted successfully",
  "ticket": {
    "id": 1,
    "title": "Login Issue",
    "description": "Users cannot login to the system",
    "priority": "High",
    "status": "Closed",
    "created_at": "2026-06-12T10:30:00.000Z"
  }
}
```

**Error Response (404 - Ticket Not Found):**
```json
{
  "message": "Ticket not found"
}
```

---

### 6. UPDATE - Change Ticket Status

**Endpoint:** `PUT http://localhost:3000/tickets/:id/status`

**URL Parameter:**
- `id` - The ticket ID to update

**Request Body:**
```json
{
  "status": "Closed"
}
```

**Valid Status Values:**
- `Open`
- `In Progress`
- `Closed`

**Steps in Postman:**
1. Create a new request
2. Select **PUT** method
3. Enter URL: `http://localhost:3000/tickets/1/status` (replace `1` with actual ticket ID)
4. Click **Body** tab
5. Select **raw** and **JSON**
6. Enter:
   ```json
   {
     "status": "Closed"
   }
   ```
7. Click **Send**

**Expected Response (200):**
```json
{
  "id": 1,
  "title": "Login Issue",
  "description": "Users cannot login to the system",
  "priority": "High",
  "status": "Closed",
  "created_at": "2026-06-12T10:30:00.000Z",
  "updated_at": "2026-06-12T11:00:00.000Z"
}
```

**Example Status Updates:**

**Mark as In Progress:**
```json
{
  "status": "In Progress"
}
```

**Error Response (404 - Ticket Not Found):**
```json
{
  "message": "Ticket not found"
}
```

---

### 7. UPDATE - Change Ticket Priority

**Endpoint:** `PUT http://localhost:3000/tickets/:id/priority`

**URL Parameter:**
- `id` - The ticket ID to update

**Request Body:**
```json
{
  "priority": "Critical"
}
```

**Valid Priority Values:**
- `Low`
- `Medium`
- `High`
- `Critical`

**Steps in Postman:**
1. Create a new request
2. Select **PUT** method
3. Enter URL: `http://localhost:3000/tickets/1/priority` (replace `1` with actual ticket ID)
4. Click **Body** tab
5. Select **raw** and **JSON**
6. Enter:
   ```json
   {
     "priority": "critical"
   }
   ```
7. Click **Send**

**Expected Response (200):**
```json
{
  "id": 1,
  "title": "Login Issue",
  "description": "Users cannot login to the system",
  "priority": "Critical",
  "status": "Open",
  "created_at": "2026-06-12T10:30:00.000Z",
  "updated_at": "2026-06-12T11:00:00.000Z"
}
```

**Error Response (404 - Ticket Not Found):**
```json
{
  "message": "Ticket not found"
}
```

---

## Complete Workflow Example

Follow these steps to test the full CRUD flow:

### Step 1: Create First Ticket
```
POST http://localhost:3000/tickets

Body:
{
  "title": "User Registration Bug",
  "description": "New users cannot complete registration",
  "priority": "High"
}
```
**Note the returned `id` (e.g., 1)**

### Step 2: Create Second Ticket
```
POST http://localhost:3000/tickets

Body:
{
  "title": "Password Reset Not Working",
  "description": "Users cannot reset forgotten passwords",
  "priority": "Critical"
}
```
### Step 3: Get All Tickets
```
GET http://localhost:3000/tickets
```

### Step 4: Get High Priority Tickets Only
```
GET http://localhost:3000/tickets?priority=High
```

### Step 5: Get Critical Priority Tickets
```
GET http://localhost:3000/tickets?priority=Critical
```

### Step 6: Update First Ticket Status
```
PUT http://localhost:3000/tickets/1/status

Body:
{
  "status": "In Progress"
}
```

### Step 7: Get All Open Tickets
```
GET http://localhost:3000/tickets?status=Open
```

### Step 8: Close First Ticket
```
PUT http://localhost:3000/tickets/1/status

Body:
{
  "status": "Closed"
}
```

### Step 9: Verify Closed Ticket
```
GET http://localhost:3000/tickets/1
```

---

## Postman Collection

You can import this collection directly into Postman by saving it as a JSON file.

**Save as `ticket-api-collection.json`:**

```json
{
  "info": {
    "name": "Ticket API CRUD",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Ticket",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Sample Issue\",\n  \"description\": \"This is a sample ticket\",\n  \"priority\": \"high\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/tickets",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tickets"]
        }
      }
    },
    {
      "name": "Get All Tickets",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/tickets",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tickets"]
        }
      }
    },
    {
      "name": "Get Tickets by Priority",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/tickets?priority=High",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tickets"],
          "query": [
            {
              "key": "priority",
              "value": "High"
            }
          ]
        }
      }
    },
    {
      "name": "Get Tickets by Status",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/tickets?status=Open",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tickets"],
          "query": [
            {
              "key": "status",
              "value": "Open"
            }
          ]
        }
      }
    },
    {
      "name": "Update Ticket Status",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"status\": \"closed\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/tickets/1/status",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tickets", "1", "status"]
        }
      }
    },
    {
      "name": "Delete Ticket",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/tickets/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tickets", "1"]
        }
      }
    }
  ]
}
```

**To import in Postman:**
1. Click **File** → **Import**
2. Select the JSON file
3. Click **Import**

---

## Common Issues

### Connection Refused
- **Issue:** Cannot connect to localhost:3000
- **Solution:** Make sure the API is running with `npm run dev`

### JSON Parse Error
- **Issue:** "Invalid JSON"
- **Solution:** Ensure Body is set to **raw** and **JSON**, and valid JSON syntax

### Missing Required Fields
- **Issue:** Error about missing title, description, or priority
- **Solution:** Include all required fields in the request body

### Ticket Not Found
- **Issue:** 404 response when updating
- **Solution:** Verify the ticket ID exists using GET request first

---

## Testing Checklist

- [ ] Create first ticket and note the ID
- [ ] Create second ticket
- [ ] Get all tickets
- [ ] Filter by high priority
- [ ] Filter by critical priority
- [ ] Filter by open status
- [ ] Update ticket status to "in_progress"
- [ ] Update ticket status to "closed"
- [ ] Get all closed tickets
- [ ] Try to get non-existent ticket (expect 404)

---

## Next Steps

1. Save and organize your requests into folders
2. Create test scenarios combining multiple requests
3. Use Pre-request Scripts to automate ticket IDs
4. Document API behavior in request notes
5. Share collection with team members

---

**Last Updated:** 2026-06-12
