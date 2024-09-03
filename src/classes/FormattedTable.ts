import { Console } from "console";
import { Transform } from "stream";

class FormattedTable {
  // Create a table from an array of objects and print it to the console formatted
  static table(input: any) {
    const ts = new Transform({
      transform(chunk, _enc, cb) {
        cb(null, chunk);
      },
    });
    const logger = new Console({ stdout: ts });
    logger.table(input);
    const table = (ts.read() || "").toString();
    let result = "";
    for (let row of table.split(/[\r\n]+/)) {
      let r = row.replace(/[^┬]*┬/, "┌");
      r = r.replace(/^├─*┼/, "├");
      r = r.replace(/│[^│]*/, "");
      r = r.replace(/^└─*┴/, "└");
      r = r.replace(/'/g, " ");
      result += `${r}\n`;
    }
    console.log(result);
  }
}

export default FormattedTable;