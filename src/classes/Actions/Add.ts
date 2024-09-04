import inquirer from "inquirer";
import GetQuery from "../Query/GetQuery.js";
import AddQuery from "../Query/AddQuery.js";
import FindQuery from "../Query/FindQuery.js";
import Cli from "../Cli.js";

class Add {
  // EMPLOYEE ACTIONS

  // Add an employee
  static async addEmployee() {
    const roles = await GetQuery.getAllRoles();
    const managers = await GetQuery.getAllEmployeesName();
    managers.unshift("None");

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: roles,
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the employee's manager?",
          choices: managers,
        },
      ])
      .then(async (answers) => {
        // find role id from role title
        const roleID = await FindQuery.findRoleID(answers.role);
        // find manager id from manager name
        let managerID;

        if (answers.manager === "None") {
          managerID = null;
        } else {
          const managerName = answers.manager.split(" ");

          managerID = await FindQuery.findManagerID(
            managerName[0],
            managerName[1]
          );
        }
        // insert the employee into the database
        await AddQuery.addEmployee(
          answers.first_name,
          answers.last_name,
          await roleID,
          await managerID
        );
        Cli.Add();
      });
  }

  // ROLE ACTIONS

  // Add a role
  static async addRole() {
    const departmentName = await GetQuery.getDepartmentName();

    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "What is the name the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does the role belong to?",
          choices: departmentName,
        },
      ])
      .then(async (answers) => {
        // find the department id from the department name array index
        const departmentID = await FindQuery.findDepartmentID(
          answers.department
        );
        // insert the role into the database
        AddQuery.addRole(answers.role, Number(answers.salary), departmentID);
        Cli.Add();
      });
  }

  // DEPARTMENT ACTIONS

  // Add a department
  static async addDepartment(): Promise<void> {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter the department name:",
        },
      ])
      .then(async (answers) => {
        await AddQuery.addDepartment(answers.name);
        Cli.Add();
      });
  }
}

export default Add;
