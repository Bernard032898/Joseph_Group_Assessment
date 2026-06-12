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
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **PostgreSQL** (for database)

## Quick Start

### dotnet-task Setup

From the repository root:

```bash
cd dotnet-task
dotnet restore
dotnet build
dotnet run
```

See [dotnet-task/README.md](dotnet-task/README.md) for detailed instructions.

### API Setup

From the repository root:

```bash
cd api
npm install
npm run dev
```

The API will run on `http://localhost:3000`

For Postman testing guide and CRUD examples, see [api/POSTMAN_GUIDE.md](api/POSTMAN_GUIDE.md).

## Project Structure

```
Joseph_Group_Assessment/
├── dotnet-task/
│   ├── README.md              # dotnet-task setup guide
│   ├── Program.cs             # Main application code
│   ├── employees.csv          # Sample employee data
│   └── dotnet-task.csproj     # Project configuration
├── api/
│   ├── README.md              # API setup guide
│   ├── POSTMAN_GUIDE.md       # Postman testing guide
│   ├── app.js                 # Express application
│   ├── package.json           # Dependencies
│   ├── controllers/           # Business logic
│   ├── routes/                # API routes
│   └── config/                # Database configuration
└── README.md                  # This file
```

## Components in Detail

### 1. dotnet-task

**Purpose:** Employee data processing and statistics

**Features:**
- Reads CSV files containing employee data
- Groups employees by department
- Displays statistical summaries
- Validates data format

**Technology:** C#, .NET 10.0

**Quick Test:** [dotnet-task/README.md](dotnet-task/README.md)

## Running the Application

### Run the Application

From the `dotnet-task` directory, run:

```bash
dotnet run
```

### Expected Output

The application will display employee statistics in the following format:

```
=== Employee Statistics ===

Total Employees: 6

Employees By Department:
Finance: 1
HR: 2
IT: 3
```

The output shows:
- Total number of employees in the CSV file
- Count of employees grouped by department (sorted alphabetically)

## Testing

### Test Data

The application includes sample employee data in `employees.csv`:

```csv
employeeId,fullName,department
1,John Doe,IT
2,Jane Smith,HR
3,Michael Brown,IT
4,Sarah Wilson,Finance
5,Chris Evans,HR
6,Robert King,IT
```

### Manual Testing

1. Run the application using `dotnet run`
2. Verify the output matches the expected statistics
3. Check that employee counts by department are correct

### Modifying Test Data

To test with different employee data:

1. Edit `employees.csv` in the `dotnet-task` folder
2. Ensure the CSV format matches the existing structure (employeeId, fullName, department)
3. Run `dotnet run` again to see updated statistics

## Test Case Scenarios

Run through these test cases to verify the application works correctly in various scenarios:

### Test Case 1: Default Data (Normal Case)
**Description**: Application runs with the original CSV data

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
1,John Doe,IT
2,Jane Smith,HR
3,Michael Brown,IT
4,Sarah Wilson,Finance
5,Chris Evans,HR
6,Robert King,IT
```

**Expected Output**:
```
=== Employee Statistics ===

Total Employees: 6

Employees By Department:
Finance: 1
HR: 2
IT: 3
```

**Validation**: ✓ Departments sorted alphabetically | ✓ Correct employee counts

---

### Test Case 2: Single Employee
**Description**: Test application with only one employee

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
1,Alice Johnson,IT
```

**Expected Output**:
```
=== Employee Statistics ===

Total Employees: 1

Employees By Department:
IT: 1
```

**Validation**: ✓ Total count is 1 | ✓ Single department displayed

---

### Test Case 3: All Employees in Same Department
**Description**: All employees belong to a single department

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
1,John Doe,IT
2,Jane Smith,IT
3,Michael Brown,IT
4,Sarah Wilson,IT
5,Chris Evans,IT
```

**Expected Output**:
```
=== Employee Statistics ===

Total Employees: 5

Employees By Department:
IT: 5
```

**Validation**: ✓ Total is 5 | ✓ Only IT department displayed with count 5

---

### Test Case 4: Multiple Departments with Equal Distribution
**Description**: Equal number of employees in each department

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
1,John Doe,IT
2,Jane Smith,HR
3,Michael Brown,Finance
4,Sarah Wilson,IT
5,Chris Evans,HR
6,Robert King,Finance
```

**Expected Output**:
```
=== Employee Statistics ===

Total Employees: 6

Employees By Department:
Finance: 2
HR: 2
IT: 2
```

**Validation**: ✓ Equal counts | ✓ All departments sorted alphabetically

---

### Test Case 5: Large Dataset
**Description**: Application handles a larger number of employees

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
1,John Doe,IT
2,Jane Smith,HR
3,Michael Brown,IT
4,Sarah Wilson,Finance
5,Chris Evans,HR
6,Robert King,IT
7,Emma Davis,Finance
8,David Wilson,IT
9,Lisa Anderson,HR
10,Tom Miller,Finance
11,Kate Taylor,IT
12,Mark Brown,HR
```

**Expected Output**:
```
=== Employee Statistics ===

Total Employees: 12

Employees By Department:
Finance: 3
HR: 3
IT: 4
IT: 4
```

**Validation**: ✓ Correct total count | ✓ Accurate per-department counts

---

### Test Case 6: Empty File (Only Headers)
**Description**: CSV file contains only headers, no employees

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
```

**Expected Output**:
```
=== Employee Statistics ===

Total Employees: 0

Employees By Department:
```

**Validation**: ✓ Shows 0 employees | ✓ No departments listed

---

### Test Case 7: Special Characters in Names
**Description**: Employee names contain special characters

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
1,José García,IT
2,François Müller,HR
3,João Silva,Finance
4,Anna O'Connor,IT
5,Søren Andersen,HR
```

**Expected Output**:
```
=== Employee Statistics ===

Total Employees: 5

Employees By Department:
Finance: 1
HR: 2
IT: 2
```

**Validation**: ✓ Special characters handled correctly | ✓ Names displayed properly

---

### Test Case 8: Missing CSV File
**Description**: Application behavior when employees.csv is missing

**Test Procedure**:
1. Rename or delete `employees.csv`
2. Run `dotnet run`

**Expected Output**:
```
employees.csv not found.
```

**Validation**: ✓ Graceful error message | ✓ Application exits cleanly

---

### Test Case 9: Departments Sorted Alphabetically
**Description**: Verify department names are sorted alphabetically regardless of data order

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
1,John Doe,Zebra
2,Jane Smith,Apple
3,Michael Brown,Banana
4,Sarah Wilson,Apple
5,Chris Evans,Zebra
```

**Expected Output**:
```
=== Employee Statistics ===

Total Employees: 5

Employees By Department:
Apple: 2
Banana: 1
Zebra: 2
```

**Validation**: ✓ Departments in alphabetical order | ✓ Not in input order

---

### Test Case 10: Many Departments
**Description**: Test with multiple diverse departments

**Test Data** (`employees.csv`):
```csv
employeeId,fullName,department
1,John Doe,IT
2,Jane Smith,HR
3,Michael Brown,Finance
4,Sarah Wilson,Operations
5,Chris Evans,Marketing
6,Robert King,Sales
7,Emma Davis,Legal
8,David Wilson,Support
```

**Expected Output**:
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

