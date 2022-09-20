import path from "path";
import {Reminder} from "./lib.js";

(async function main() {
    console.clear();

    const reminder = new Reminder();
    console.log("-".repeat(80));
    await reminder.data_convert();
    await reminder.remind();

})()

//read and show
//compute time and append new