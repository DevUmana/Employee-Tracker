import { pool, connectToDb } from "../../connection.js";

await connectToDb();

class FindQuery {
  // Find employee ID
  static async findEmployeeID(firstName: string, lastName: string) {
    const sql =
      "SELECT id FROM employee WHERE first_name = $1 AND last_name = $2";
    const result = await pool.query(sql, [firstName, lastName]);
    return result.rows[0].id;
  }

  // Find department ID
  static async findDepartmentID(departmentName: string) {
    const sql = "SELECT id FROM department WHERE name = $1";
    const result = await pool.query(sql, [departmentName]);
    return result.rows[0].id;
  }

  // Find role ID
  static async findRoleID(title: string) {
    const sql = "SELECT id FROM role WHERE title = $1";
    const result = await pool.query(sql, [title]);
    return result.rows[0].id;
  }
  
  // Find manager ID
  static async findManagerID(
    managerFirstName: string,
    managerLastName: string
  ) {
    const sql =
      "SELECT id FROM employee WHERE first_name = $1 AND last_name = $2";
    const result = await pool.query(sql, [managerFirstName, managerLastName]);
    return result.rows[0].id;
  }
}

export default FindQuery;
