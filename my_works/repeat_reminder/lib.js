import fs from "fs/promises";
import path from "path";

console.clear();
const Reminder = class {
    cwd = process.cwd();
    data_txt_path = path.resolve(this.cwd, "data", "data.txt");
    data_json_path = path.resolve(this.cwd, "data", "data.json");


    async data_convert() {
        let data_arr = (await fs.readFile(this.data_txt_path, "utf-8")).split("\r\n");

        if (data_arr[0].trim()) {
            const date_now = Date.now();
            let data_object_last;
    
            try {
                data_object_last = JSON.parse(await fs.readFile(this.data_json_path, "utf-8"));
            } catch(err) {
                console.log("err:", err);
                data_object_last = [];
            }
    
            for (const item of data_arr) {
                const item_split = item.split(" ");
                console.log("item_split:", item_split);
                data_object_last.push({
                    topic: item_split[0],
                    chain: item_split[1],
                    time_last: date_now,
                    lvl: {
                        now: 1,
                        done: 0,
                    },
                });
            }
        // console.log("-".repeat(80));
        // console.log(data_object_last);
        await fs.writeFile(this.data_json_path, JSON.stringify(data_object_last, null, 4));
        await fs.writeFile(this.data_txt_path, "");
        }
    }

    async restate() {
        const data_json = JSON.parse(await fs.readFile(this.data_json_path));
        const day = 24 * 60 * 60 * 1000 ;

        let res_str = "";
        console.log(data_json);
        for (const data_item of data_json) {
            const lvl_now = data_item.lvl.now;

            const time_dist = +((Date.now() - data_item.time_last) / day);
            console.log("lvl_now:",lvl_now, "time_dist:", time_dist);

            switch (lvl_now) {
                case 1: {
                    if (time_dist > 0.7) {
                        data_item.time_last = Date.now();
                        data_item.lvl.done += 1;
                        if (data_item.lvl.done > 7) {
                            data_item.lvl.now = 2;
                            data_item.lvl.done = 0;
                        }
                        res_str += `topic: ${data_item.topic} - ${data_item.chain}\n`;
                    }
                    break;
                }
                case 2: {
                    if (time_dist > 1.7) {
                        data_item.time_last = Date.now();
                        data_item.lvl.done += 1;
                        if (data_item.lvl.done > 7) {
                            data_item.lvl.now = 3;
                            data_item.lvl.done = 0;
                        }
                        res_str += `topic: ${data_item.topic} - ${data_item.chain}\n`;
                    }
                    break;
                }
                case 3: {
                    if (time_dist > 2.7) {
                        data_item.time_last = Date.now();
                        data_item.lvl.done += 1;
                        if (data_item.lvl.done > 7) {
                            data_item.lvl.now = 5;
                            data_item.lvl.done = 0;
                        }
                        res_str += `topic: ${data_item.topic} - ${data_item.chain}\n`;
                    }
                    break;
                }
                case 5: {
                    if (time_dist > 4.7) {
                        data_item.time_last = Date.now();
                        data_item.lvl.done += 1;
                        if (data_item.lvl.done > 7) {
                            data_item.lvl.now = 7;
                            data_item.lvl.done = 0;
                        }
                        res_str += `topic: ${data_item.topic} - ${data_item.chain}\n`;
                    }
                    break;
                }
                case 7: {
                    if (time_dist > 6.7) {
                        data_item.time_last = Date.now();
                        data_item.lvl.done += 1;
                        if (data_item.lvl.done > 7) {
                            // data_item.lvl.now = 7;
                            data_item.lvl.done = 0;
                        }
                        res_str += `topic: ${data_item.topic} - ${data_item.chain}\n`;
                    }
                    break;
                }
                default: {
                    console.log("none");
                }
            }
        }

        await fs.writeFile(this.data_json_path, JSON.stringify(data_json, null, 4));
        return res_str;
    }

    async remind() {
        console.log(await this.restate());
    }
};


export {
    Reminder,
}



