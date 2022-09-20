import path from "path";
import fs from "fs/promises";
import chalk from "chalk";
import readline from "readline-sync";

const MatchChecker = class {
    cwd = process.cwd();
    my_data_path = path.resolve(this.cwd, "data", "my_data");
    alien_data_path = path.resolve(this.cwd, "data", "alien_data.txt");

    read_file = file_path => new Promise(async res => {
        res((await fs.readFile(file_path, "utf-8")).replace(/ /g, "").split("\r\n"));

    })


    async read_line() {
        let dir_data;
        try {
            dir_data = await fs.readdir(this.my_data_path);
            dir_data = dir_data.map(item => item.replace(/\.\w+/, ""));
        } catch(err) {
            console.log(chalk.red(err));
        }
        
        console.clear();
        console.log(chalk.yellow("Pick a file:"));
        const rd = readline.keyInSelect(dir_data, "",{
            guide: false,
        });

        if (rd != -1) {
            try {
                const res = await Promise.all([
                    this.read_file(path.resolve(this.my_data_path, `${dir_data[rd]}.txt`)),
                    this.read_file(this.alien_data_path),
                ]);
                return res; 
            } catch(err) {
                console.log(chalk.red(err));
            }
        } else {
            console.clear();
            console.log(chalk.yellow("Canceled"));
            process.exit(0);
        }
    }

    async check_match() {
        const arr = await this.read_line();
        console.log(arr)
        const [my_data_arr, alien_data_arr] = arr;
        let matches = false;

        console.clear();

        my_data_arr.forEach(my_item => {
            alien_data_arr.forEach(alien_item => {
                if (alien_item.match(/[!@#$%^&*()]/)) {
                    if (my_item && my_item.includes(alien_item.match(/\w+(?=[!@#$%^&*()])/)[0])) {
                        console.log(chalk.green(my_item));
                        matches = true;
                    }
                } else {
                    if (my_item && my_item == alien_item) {
                        console.log(chalk.green(my_item));
                        matches = true;
                    }
                }
            });
        });
        if (!matches) {
            console.log(chalk.red("No matches :("))
        }
    }
}

export {
    MatchChecker,
}

