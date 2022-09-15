import fs from "fs/promises";
import path from "path";

(async function main() {
    console.clear();
    
    const cwd = process.cwd();

    await fs.writeFile(path.resolve(cwd, "data", "data1.txt"), "hello there\n");
    await fs.appendFile(path.resolve(cwd, "data", "data1.txt"), "777777");
    await fs.copyFile(path.resolve(cwd, "data", "data1.txt"), path.resolve(cwd, "data", "data2.txt"));
    const data = await fs.readFile(path.resolve(cwd, "data", "data.txt"), "utf-8");
    // await fs.rm(path.resolve(cwd, "data", "data1.txt"));

    await fs.mkdir(path.resolve(cwd, "data", "data1","data2"), {recursive: true})
    // await fs.rm(path.resolve(cwd, "data", "data1"), {recursive: true});

    const read_dir = await fs.readdir(path.resolve(cwd, "data", ));
    console.log(read_dir);



})()