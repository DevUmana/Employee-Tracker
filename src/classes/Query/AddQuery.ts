import { pool, connectToDb } from "../../connection.js";

await connectToDb("AddQuery");

class AddQuery {
  // EMPLOYEE QUERIES

  // Add employee
  static async addEmployee(
    firstName: string,
    lastName: string,
    roleId: number,
    managerId: number
  ) {
    const sql =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
    await pool.query(sql, [firstName, lastName, roleId, managerId]);
  }

  // ROLE QUERIES

  // Add role
  static async addRole(title: string, salary: number, departmentId: number) {
    const sql =
      "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
    await pool.query(sql, [title, salary, departmentId]);
  }

  // DEPARTMENT QUERIES

  // Add department
  static async addDepartment(departmentName: string) {
    const sql = "INSERT INTO department (name) VALUES ($1)";
    await pool.query(sql, [departmentName]);
  }
}

export default AddQuery;
