import cluster from "cluster";

(function main() {
    if (cluster.isWorker) {
        console.log("-WorkerThread-", "_process:", process.pid, "_threadId:", cluster.worker.id, "workerData:", JSON.parse(process.env.workerData));

        cluster.worker.on("message", msg => {
            console.log("Message from: -MainThread-", msg, "_threadId:", cluster.worker.id)
        });

        setTimeout(function () {
            cluster.worker.send("Bye, bro")
        }, 700)

        

        setTimeout(function() {
            // process.exit(0); или
            cluster.worker.disconnect();
        }, 1000)
    }
})()