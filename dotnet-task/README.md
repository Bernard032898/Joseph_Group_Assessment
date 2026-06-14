# dotnet-task

A small .NET console application that reads `employees.csv`, groups employees by department, and prints department counts.

## Setup

### Prerequisites
- .NET SDK 10.0 or higher
- A terminal such as PowerShell or Command Prompt

### Install / restore
```powershell
cd dotnet-task
dotnet restore
```

### Build
```powershell
dotnet build
```

## Run

From the `dotnet-task` folder:
```powershell
dotnet run
```

The application reads `employees.csv` from the current directory and prints a summary of employee counts by department.

## Notes and assumptions
- `employees.csv` must exist in the `dotnet-task` folder.
- The file must contain a header row: `employeeId,fullName,department`.
- Each employee line must contain exactly three comma-separated fields.
- If the file is missing, the app prints `employees.csv not found.` and exits.
- The app currently does not support additional CSV quoting or escaped commas.

## Sample output
```text
=== Employee Statistics ===

Total Employees: 6

Employees By Department:
Finance: 1
HR: 2
IT: 3
```

## Test cases and validation
1. **Default dataset**
	- Run: `dotnet run`
	- Expected: output includes `Total Employees: 6` and counts for `Finance`, `HR`, and `IT`.
2. **Missing CSV file**
	- Rename or remove `employees.csv`.
	- Run: `dotnet run`
	- Expected: output `employees.csv not found.`
3. **Header-only CSV**
	- Keep only the header row in `employees.csv`.
	- Run: `dotnet run`
	- Expected: `Total Employees: 0` and no department lines.
4. **Single department data**
	- Use rows where all employees share one department.
	- Expected: total count matches number of rows and a single department count is printed.

### Validation
- Confirm the header is exactly `employeeId,fullName,department`.
- Confirm each line has exactly 3 comma-separated values.
- Confirm the application prints a summary and exits cleanly.
- Confirm the app handles missing CSV file gracefully.

## Modify sample data
1. Open `employees.csv`.
2. Edit or add rows while preserving the header.
3. Save the file.
4. Run `dotnet run` again.

## Troubleshooting
- If `dotnet` is not found, install the .NET SDK and restart the terminal.
- If build fails, try `dotnet clean`, then `dotnet restore`, then `dotnet build`.
- If CSV parsing fails, ensure each row has 3 fields and the header is correct.

## Files
- `Program.cs` — application logic
- `employees.csv` — sample data
- `dotnet-task.csproj` — project file

