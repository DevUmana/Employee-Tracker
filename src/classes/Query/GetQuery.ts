import { pool, connectToDb } from "../../connection.js";

await connectToDb();

class GetQuery {
  // Get all employees with their roles, departments, salaries, and managers
  static async getAllEmployee() {
    const sql =
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id";
    const results = await pool.query(sql);
    const rows = results.rows.map((row) => {
      return {
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        title: row.title,
        department: row.name,
        salary: row.salary,
        manager: row.manager,
      };
    });
    return rows;
  }
  // Get all employees First and Last name
  static async getAllEmployeesName() {
    const employees: string[] = [];
    const sql = "SELECT first_name, last_name FROM employee";
    const results = await pool.query(sql);

    for (let i = 0; i < results.rows.length; i++) {
      employees.push(
        `${results.rows[i].first_name} ${results.rows[i].last_name}`
      );
    }
    return employees;
  }
  // Get all employees by manager
  static async getAllEmployeesByManager(manager: string) {
    const sql =
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE employee.manager_id = (SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = $1)";
    const results = await pool.query(sql, [manager]);
    const rows = results.rows.map((row) => {
      return {
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        title: row.title,
        department: row.name,
        salary: row.salary,
      };
    });
    return rows;
  }
  // Get all employees by department
  static async getAllEmployeesByDepartment(department: string) {
    const sql =
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id WHERE department.name = $1";
    const results = await pool.query(sql, [department]);
    const rows = results.rows.map((row) => {
      return {
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        title: row.title,
        department: row.name,
        salary: row.salary,
        manager: row.manager,
      };
    });
    return rows;
  }
  // Get all departments ID and name
  static async getAllDepartments() {
    const sql = "SELECT id, name FROM department";
    const results = await pool.query(sql);
    return results.rows;
  }
  // Get all department names
  static async getDepartmentName() {
    const departments: string[] = [];
    const sql = "SELECT name FROM department";
    const results = await pool.query(sql);

    for (let i = 0; i < results.rows.length; i++) {
      departments.push(results.rows[i].name);
    }
    return departments;
  }
  // Get all roles ID and title
  static async getAllRoles() {
    const roles: string[] = [];
    const sql = "SELECT id, title FROM role";
    const results = await pool.query(sql);

    for (let i = 0; i < results.rows.length; i++) {
      roles.push(results.rows[i].title);
    }
    return roles;
  }
  // Get all role titles
  static async getRoleTitle() {
    const roles: string[] = [];
    const sql = "SELECT title FROM role";
    const results = await pool.query(sql);

    for (let i = 0; i < results.rows.length; i++) {
      roles.push(results.rows[i].title);
    }
    return roles;
  }
  // Get Manager name
  static async getManager() {
    const managers: string[] = [];
    const sql =
      "SELECT first_name, last_name FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee)";
    const results = await pool.query(sql);

    for (let i = 0; i < results.rows.length; i++) {
      managers.push(
        `${results.rows[i].first_name} ${results.rows[i].last_name}`
      );
    }
    return managers;
  }
  // Get all roles with their departments
  static async getAllRolesAndDepartment() {
    const sql =
      "SELECT role.id, role.title, department.name, role.salary FROM role JOIN department ON role.department_id = department.id";
    const results = await pool.query(sql);
    const rows = results.rows.map((row) => {
      return {
        id: row.id,
        title: row.title,
        department: row.name,
        salary: row.salary,
      };
    });
    return rows;
  }

  // Get Salary by department
  static async getTotalSalariesByDepartment(department: string) {
    // Get the total salaries by department using SUM AS and GROUP By
    const sql = "SELECT SUM(role.salary) FROM role JOIN department ON role.department_id = department.id WHERE department.name = $1 GROUP BY department.name";
    const results = await pool.query(sql, [department]);
    return results.rows[0].sum;
  }

}

export default GetQuery;
