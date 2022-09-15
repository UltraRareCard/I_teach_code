import process from "process";
import os from "os";

(async function main() {
    console.clear();
    
    //немного os
    const os_cpus = os.cpus().length;
    console.log("os_cpus_length:", os_cpus);

    const process_argv = process.argv;
    console.log("process_argv:", process_argv);

    const process_pid = process.pid;
    console.log("process_pid:", process_pid);

    const sleep = ms => new Promise(res => setTimeout(() => res(),ms));
    
    let i = 0;
    while (true) {
        console.log(i);
        if (i == 50) {
            process.disconnect
        }
        i++;
        await sleep(50)
    }
})()



