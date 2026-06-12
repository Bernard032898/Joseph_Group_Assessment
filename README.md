# Joseph Group Assessment

This repository contains the Joseph Group Assessment project, including a .NET console application for employee data processing.

## Project Overview

The `dotnet-task` is a .NET application that reads employee data from a CSV file and displays employee statistics organized by department.

## Prerequisites

Before setting up this project on your device, ensure you have the following installed:

- **Git**: For cloning the repository
  - [Download Git](https://git-scm.com/download/win)
  
- **.NET SDK 10.0 or higher**: Required to build and run the application
  - [Download .NET SDK](https://dotnet.microsoft.com/download)
  - Verify installation: Open terminal and run `dotnet --version`

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Joseph_Group_Assessment
```

### 2. Navigate to the dotnet-task Folder

```bash
cd dotnet-task
```

### 3. Restore Dependencies

```bash
dotnet restore
```

### 4. Build the Project

```bash
dotnet build
```

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

## Support

For issues or questions, please refer to the troubleshooting section above or contact the development team.
