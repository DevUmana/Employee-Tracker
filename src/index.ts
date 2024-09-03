import Cli from "./classes/Cli.js";
import fs from "fs";

const readArt = async() => {
    const data = fs.promises.readFile("src/art.txt", "utf8");
    return data;
};

const displayArt = await readArt();
console.log(displayArt);

Cli.startCli();
