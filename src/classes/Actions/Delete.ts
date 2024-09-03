import inquirer from "inquirer";
import GetQuery from "../Query/GetQuery.js";
import FindQuery from "../Query/FindQuery.js";
import DeleteQuery from "../Query/DeleteQuery.js";
import Cli from "../Cli.js";

class Delete {
    // Delete an employee
    static async deleteEmployee() {
        const employees = await GetQuery.getAllEmployeesName();
        inquirer
        .prompt([
            {
            type: "list",
            name: "employee",
            message: "Which employee do you want to delete?",
            choices: employees,
            },
        ])
        .then(async (answers) => {
            // find employee id from employee name
            const employeeName = answers.employee.split(" ");
            const employeeID = await FindQuery.findEmployeeID(
            employeeName[0],
            employeeName[1]
            );
            // delete the employee from the database
            await DeleteQuery.deleteEmployee(employeeID);
            Cli.Delete();
        });
    }
    
    // Delete a department
    static async deleteDepartment() {
        const departments = await GetQuery.getDepartmentName();
        inquirer
        .prompt([
            {
            type: "list",
            name: "department",
            message: "Which department do you want to delete?",
            choices: departments,
            },
        ])
        .then(async (answers) => {
            // find department id from department name
            const departmentID = await FindQuery.findDepartmentID(answers.department);
            // delete the department from the database
            await DeleteQuery.deleteDepartment(departmentID);
            Cli.Delete();
        });
    }
    
    // Delete a role
    static async deleteRole() {
        const roles = await GetQuery.getRoleTitle();
        inquirer
        .prompt([
            {
            type: "list",
            name: "role",
            message: "Which role do you want to delete?",
            choices: roles,
            },
        ])
        .then(async (answers) => {
            // find role id from role title
            const roleID = await FindQuery.findRoleID(answers.role);
            // delete the role from the database
            await DeleteQuery.deleteRole(roleID);
            Cli.Delete();
        });
    }
}

export default Delete;