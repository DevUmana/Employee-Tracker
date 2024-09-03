import inquirer from "inquirer";
import GetQuery from "../Query/GetQuery.js";
import FormattedTable from "../FormattedTable.js";
import Cli from "../Cli.js";

class View {
  // View all employees
  static async viewAllEmployees() {
    const employees = await GetQuery.getAllEmployee();
    FormattedTable.table(employees);
    Cli.View();
  }

  // View all departments
  static async viewAllDepartments() {
    const departments = await GetQuery.getAllDepartments();
    FormattedTable.table(departments);
    Cli.View();
  }

  // View all roles
  static async viewAllRoles() {
    const roles = await GetQuery.getAllRolesAndDepartment();
    FormattedTable.table(roles);
    Cli.View();
  }

  // View all employees by manager
  static async viewAllEmployeesByManager() {
    // prompt user to select a manager
    const managers = await GetQuery.getManager();
    inquirer
      .prompt([
        {
          type: "list",
          name: "manager",
          message: "Select a manager",
          choices: managers,
        },
      ])
      .then(async (answers) => {
        const employees = await GetQuery.getAllEmployeesByManager(
          answers.manager
        );
        FormattedTable.table(employees);
        Cli.View();
      });
  }

  // View all employees by department
  static async viewAllEmployeesByDepartment() {
    // prompt user to select a department
    const departments = await GetQuery.getDepartmentName();
    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Select a department",
          choices: departments,
        },
      ])
      .then(async (answers) => {
        const employees = await GetQuery.getAllEmployeesByDepartment(
          answers.department
        );
        FormattedTable.table(employees);
        Cli.View();
      });
  }

  // View total salaries by department
  static async viewTotalSalariesByDepartment() {
    const departments = await GetQuery.getDepartmentName();
    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Select a department",
          choices: departments,
        },
      ])
      .then(async (answers) => {
        const totalSalaries = await GetQuery.getTotalSalariesByDepartment(
          answers.department
        );
        console.log(
          `Total utilized budget for ${answers.department}: $${totalSalaries}`
        );
        Cli.View();
      });
  }
}

export default View;
