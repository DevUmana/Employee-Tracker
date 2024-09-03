import inquirer from "inquirer";
import View from "./Actions/View.js";
import Add from "./Actions/Add.js";
import Delete from "./Actions/Delete.js";
import Update from "./Actions/Update.js";

class Cli {
  static View() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "View Employees by Manager",
            "View Employees by Department",
            "View Total Utilized Budget by Department",
            "Back",
            "Quit",
          ],
        },
      ])
      .then(async (answers) => {
        switch (answers.action) {
          case "View All Employees":
            View.viewAllEmployees();
            break;
          case "View All Roles":
            View.viewAllRoles();
            break;
          case "View All Departments":
            View.viewAllDepartments();
            break;
          case "View Employees by Manager":
            View.viewAllEmployeesByManager();
            break;
          case "View Employees by Department":
            View.viewAllEmployeesByDepartment();
            break;
          case "View Total Utilized Budget by Department":
            View.viewTotalSalariesByDepartment();
            break;
          case "Back":
            this.startCli();
            break;
          case "Quit":
            this.quit();
            break;
        }
      });
  }

  static Add() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
            "Add Employee",
            "Add Role",
            "Add Department",
            "Back",
            "Quit",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "Add Employee":
            Add.addEmployee();
            break;
          case "Add Role":
            Add.addRole();
            break;
          case "Add Department":
            Add.addDepartment();
            break;
          case "Back":
            this.startCli();
            break;
          case "Quit":
            this.quit();
            break;
        }
      });
  }

  static Delete() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
            "Delete Employee",
            "Delete Role",
            "Delete Department",
            "Back",
            "Quit",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "Delete Employee":
            Delete.deleteEmployee();
            break;
          case "Delete Role":
            Delete.deleteRole();
            break;
          case "Delete Department":
            Delete.deleteDepartment();
            break;
          case "Back":
            this.startCli();
            break;
          case "Quit":
            this.quit();
            break;
        }
      });
  }

  static Update() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
            "Update Employee Role",
            "Update Employee Manager",
            "Back",
            "Quit",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "Update Employee Role":
            Update.updateEmployeeRole();
            break;
          case "Update Employee Manager":
            Update.updateEmployeeManager();
            break;
          case "Back":
            this.startCli();
            break;
          case "Quit":
            this.quit();
            break;
        }
      });
  }

  // Quit the application
  static quit() {
    console.log("Goodbye!");
    process.exit();
  }

  // Start the CLI
  static startCli() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Welcome, what action would you like to take?",
          choices: ["View", "Add", "Delete", "Update", "Quit"],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "View":
            this.View();
            break;
          case "Add":
            this.Add();
            break;
          case "Delete":
            this.Delete();
            break;
          case "Update":
            this.Update();
            break;
          case "Quit":
            this.quit();
            break;
        }
      });
  }
}

export default Cli;
