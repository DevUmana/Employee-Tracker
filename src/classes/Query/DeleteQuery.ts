import { pool, connectToDb } from "../../connection.js";

await connectToDb();

class DeleteQuery {
  // EMPLOYEE QUERIES

  // Delete employee
  static async deleteEmployee(employeeId: number) {
    const sql = "DELETE FROM employee WHERE id = $1";
    await pool.query(sql, [employeeId]);
  }

  // ROLE QUERIES

  // Delete role and all employees associated with it
  static async deleteRole(roleId: number) {
    const sqlEmployee = "DELETE FROM employee WHERE role_id = $1";
    await pool.query(sqlEmployee, [roleId]);

    const sql = "DELETE FROM role WHERE id = $1";
    await pool.query(sql, [roleId]);
  }

  // DEPARTMENT QUERIES

  // Delete department and all roles associated with it
  static async deleteDepartment(departmentId: number) {
    const sqlRole = "DELETE FROM role WHERE department_id = $1";
    await pool.query(sqlRole, [departmentId]);

    const sql = "DELETE FROM department WHERE id = $1";
    await pool.query(sql, [departmentId]);
  }
}

export default DeleteQuery;
