import inquirer from "inquirer";
import GetQuery from "../Query/GetQuery.js";
import UpdateQuery from "../Query/UpdateQuery.js";
import FindQuery from "../Query/FindQuery.js";
import Cli from "../Cli.js";

class Update {
  // Update employee roles
  static async updateEmployeeRole() {
    const employees = await GetQuery.getAllEmployeesName();
    const roles = await GetQuery.getRoleTitle();

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role do you want to update?",
          choices: employees,
        },
        {
          type: "list",
          name: "role",
          message: "Which role do you want to assign the selected employee?",
          choices: roles,
        },
      ])
      .then(async (answers) => {
        // find role id from role title
        const roleID = await FindQuery.findRoleID(answers.role);

        // find employee id from employee name
        const employeeName = answers.employee.split(" ");
        const employeeID = await FindQuery.findEmployeeID(
          employeeName[0],
          employeeName[1]
        );

        // update the employee's role in the database
        await UpdateQuery.updateEmployeeRole(employeeID, roleID);
        Cli.Update();
      });
  }

  // Update employee managers
  static async updateEmployeeManager() {
    const employees = await GetQuery.getAllEmployeesName();
    const employeesWithNone = employees.slice();
    employeesWithNone.unshift("None");

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's manager do you want to update?",
          choices: employees,
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the employee's new manager?",
          choices: employeesWithNone,
        },
      ])
      .then(async (answers) => {
        // find manager id from manager name
        let managerID;

        if (answers.manager === "None") {
          managerID = null;
        } else if (answers.manager === answers.employee) {
          managerID = null;
        } else {
          const managerName = answers.manager.split(" ");
          managerID = await FindQuery.findManagerID(
            managerName[0],
            managerName[1]
          );
        }

        // find employee id from employee name
        const employeeName = answers.employee.split(" ");
        const employeeID = await FindQuery.findEmployeeID(
          employeeName[0],
          employeeName[1]
        );

        // update the employee's manager in the database
        await UpdateQuery.updateEmployeeManager(employeeID, managerID);
        Cli.Update();
      });
  }
}

export default Update;
