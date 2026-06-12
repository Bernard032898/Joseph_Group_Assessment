# dotnet-task Setup and Testing Guide

This README explains how to set up, run, and test the `dotnet-task` console application.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Run the Application](#run-the-application)
- [Verify Output](#verify-output)
- [Test Cases](#test-cases)
- [Modify Sample Data](#modify-sample-data)
- [Troubleshooting](#troubleshooting)
- [Project Files](#project-files)
- [Quick Commands](#quick-commands)
- [Need Help?](#need-help)

---

## Overview

The `dotnet-task` project reads employee records from `employees.csv`, groups them by department, and prints employee statistics.

## Prerequisites

Install these tools before continuing:

- **Git**
  - Verify with: `git --version`
  - Download: https://git-scm.com/download/win
- **.NET SDK 10.0 or higher**
  - Verify with: `dotnet --version`
  - Download: https://dotnet.microsoft.com/download

---

## Setup

1. Open **Command Prompt** or **PowerShell**.
2. Navigate to the folder where you want the repository.
   ```powershell
   cd C:\Users\YourName\Documents
   ```
3. Clone the repository.
   ```powershell
   git clone <repository-url>
   ```
4. Open the project folder.
   ```powershell
   cd Joseph_Group_Assessment\dotnet-task
   ```
5. Restore dependencies.
   ```powershell
   dotnet restore
   ```
6. Build the project.
   ```powershell
   dotnet build
   ```

---

## Run the Application

From the `dotnet-task` folder, run:

```powershell
dotnet run
```

The app reads `employees.csv` and prints department statistics.

---

## Verify Output

Expected output for the provided sample data:

```text
=== Employee Statistics ===

Total Employees: 6

Employees By Department:
Finance: 1
HR: 2
IT: 3
```

If you see this output, setup is complete.

---

## Test Cases

Use these cases to verify behavior and edge cases.

### Test Case 1: Default Data
- Description: Validate with sample data.
- Expected: 6 total employees, 3 departments.

### Test Case 2: Single Employee
- Data:
  ```csv
  employeeId,fullName,department
  1,Alice Johnson,IT
  ```
- Expected: `Total Employees: 1`, `IT: 1`

### Test Case 3: One Department Only
- Data:
  ```csv
  employeeId,fullName,department
  1,John Doe,IT
  2,Jane Smith,IT
  3,Michael Brown,IT
  ```
- Expected: `Total Employees: 3`, `IT: 3`

### Test Case 4: Equal Department Distribution
- Data:
  ```csv
  employeeId,fullName,department
  1,John Doe,IT
  2,Jane Smith,HR
  3,Michael Brown,Finance
  4,Sarah Wilson,IT
  5,Chris Evans,HR
  6,Robert King,Finance
  ```
- Expected departments sorted alphabetically with equal counts.

### Test Case 5: Empty Dataset
- Data:
  ```csv
  employeeId,fullName,department
  ```
- Expected: `Total Employees: 0`, no departments listed.

### Test Case 6: Missing File
- Procedure: rename or remove `employees.csv`, then run.
- Expected: `employees.csv not found.`

---

## Modify Sample Data

1. Open `employees.csv`.
2. Keep the format exactly:
   ```csv
   employeeId,fullName,department
   1,John Doe,IT
   ```
3. Save the file.
4. Run `dotnet run` again.

---

## Troubleshooting

### .NET SDK Missing
- Install .NET SDK 10.0 or higher.
- Restart your terminal.
- Verify with `dotnet --version`.

### Git Missing
- Install Git and add it to PATH.
- Verify with `git --version`.

### `employees.csv not found`
- Confirm you are inside `dotnet-task`.
- Confirm `employees.csv` exists.

### Build Errors
- Clean the project: `dotnet clean`
- Restore again: `dotnet restore`
- Build again: `dotnet build`

### CSV Formatting Issues
- Make sure the first line is exactly:
  `employeeId,fullName,department`
- Each row must have 3 values separated by commas.

---

## Project Files

- `Program.cs` - application logic
- `employees.csv` - sample employee data
- `dotnet-task.csproj` - project settings
- `bin/` - build output
- `obj/` - build artifacts

---

## Quick Commands

```powershell
cd Joseph_Group_Assessment\dotnet-task

dotnet restore
dotnet build
dotnet run
dotnet clean
```

---

## Need Help?

If you still have issues:
1. Re-read the troubleshooting section.
2. Check the command output for the actual error.
3. Confirm the correct working directory.
4. Ask the development team for assistance.


**Last Updated**: 2026-06-12
