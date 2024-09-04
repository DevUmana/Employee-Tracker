import { pool, connectToDb } from "../../connection.js";

await connectToDb("UpdateQuery");

class UpdateQuery {
  // EMPLOYEE QUERIES

  // Update employee role
  static async updateEmployeeRole(employeeId: number, roleId: number) {
    const sql = "UPDATE employee SET role_id = $1 WHERE id = $2";
    await pool.query(sql, [roleId, employeeId]);
  }

  // MANAGER QUERIES

  // Update employee manager
  static async updateEmployeeManager(employeeId: number, managerId: number) {
    const sql = "UPDATE employee SET manager_id = $1 WHERE id = $2";
    await pool.query(sql, [managerId, employeeId]);
  }
}

export default UpdateQuery;
