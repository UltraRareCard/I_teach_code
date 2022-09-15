import cluster from "cluster";

(function main() {
    if (cluster.isPrimary) {
        console.clear();
        console.log("-MainThread-", "process:", process.pid);

        cluster.setupPrimary({
            exec: "./workers/cluster_worker.js",
        });

        let workers = [];

        for (let i = 0; i < 5; i++) {
            const worker = cluster.fork({
                workerData: JSON.stringify({
                    name: "Ivan",
                    age: i + 1,
                })
            });

            workers.push(worker);
        }

        for (const worker of workers) {
            worker.addListener("disconnect", () => {
                console.log("Exit: -WorkerThread-")
            })

            worker.addListener("message", msg => {
                console.log("Message from: -WorkerThread-", msg)
            })

            setTimeout(function() {
                worker.send("Hello man!");
            }, 500)
        }
        
    }
})()