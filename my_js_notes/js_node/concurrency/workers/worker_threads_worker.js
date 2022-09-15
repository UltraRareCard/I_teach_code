import {isMainThread, threadId, workerData, parentPort} from "worker_threads";

(async function main() {
    if (!isMainThread) {
        console.log("-WorkerThread-", "_process:", process.pid, "_threadId:", threadId, "workerData:", workerData);

        parentPort.on("message", msg => {
            console.log("Message from: -MainThread-", msg, "_threadId:", threadId)
        });

        setTimeout(function () {
            parentPort.postMessage("Bye, bro;")
        }, 700)

        

        setTimeout(function() {
            process.exit(0);
        }, 1000)
    }
})()
