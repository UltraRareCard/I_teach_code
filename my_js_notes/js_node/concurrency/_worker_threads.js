import {Worker, isMainThread,threadId, workerData,} from "worker_threads";
import path from "path";

(function main() {
    if (isMainThread) {
        console.clear();
        console.log("-MainThread-", "process:", process.pid);

        let workers = [];

        for (let i = 0; i < 5; i++) {
            const worker = new Worker("./workers/worker_threads_worker.js", {
                workerData: {
                    name: "Ivan",
                    age: i + 1,
                }
            });
            workers.push(worker);
        }

        for(const worker of workers) {
            worker.addListener("exit", () => {
                console.log("Exit: -WorkerThread-")
            });

            worker.addListener("message", msg => {
                console.log("Message from: -WorkerThread-", msg)
            })

            setTimeout(function() {
                worker.postMessage("Hello man!");
            }, 500)
        }


    }
})()