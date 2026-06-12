using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

class Employee
{
    public int EmployeeId { get; set; }
    public string FullName { get; set; } = "";
    public string Department { get; set; } = "";
}

class Program
{
    static void Main()
    {
        string filePath = "employees.csv";

        if (!File.Exists(filePath))
        {
            Console.WriteLine("employees.csv not found.");
            return;
        }

        var employees = File.ReadLines(filePath)
            .Skip(1)
            .Select(line =>
            {
                var columns = line.Split(',');

                return new Employee
                {
                    EmployeeId = int.Parse(columns[0]),
                    FullName = columns[1],
                    Department = columns[2]
                };
            })
            .ToList();

        Console.WriteLine("=== Employee Statistics ===");
        Console.WriteLine();

        Console.WriteLine($"Total Employees: {employees.Count}");
        Console.WriteLine();

        Console.WriteLine("Employees By Department:");

        var departmentGroups = employees
            .GroupBy(e => e.Department)
            .OrderBy(g => g.Key);

        foreach (var group in departmentGroups)
        {
            Console.WriteLine($"{group.Key}: {group.Count()}");
        }
    }
}