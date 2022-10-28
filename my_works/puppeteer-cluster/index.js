"use strict";
import prompts from "prompts";
import chalk from "chalk";
import {Cluster,} from "puppeteer-cluster";

import work from "./lib/form_fill.js";

(async function main() {
    console.clear();
    
    const {multi_rounds, multi_type} = await prompts([
        {
            type: "number",
            name: "multi_rounds",
            message: "Type amount of rounds",
            validate: value => value < 1001,
        },
        {
            type: "select",
            name: "multi_type",
            message: "Select type",
            choices: [
                {title: "pages", value: "CONCURRENCY_PAGE",},
                {title: "contexts", value: "CONCURRENCY_CONTEXT",},
                {title: "browsers", value: "CONCURRENCY_BROWSER",},
            ]
        }
    ]); 

    // process.setMaxListeners(15);

    const cluster = await Cluster.launch({
        concurrency: Cluster[multi_type],
        maxConcurrency: 10,
        monitor: true,
        // workerCreationDelay: 100,
        retryDelay: 0,
        // retryLimit: 10,

        // puppeteer,
        puppeteerOptions: {
            timeout: 10 * 1000,
            // headless: false,
            // timeout: 0,
            args: [
                // '--disable-gpu',
                // '--disable-software-rasterizer',
                // '--no-sandbox',,
            ]
            
        }
    });

    cluster.on('taskerror', (err, data) => {
        console.log(chalk.red(`Error: ${data}: ${err.message}`));
        cluster.queue("https://docs.google.com/forms/d/e/1FAIpQLSeVgCaSbnPn_JIpg20StF0JPyE76CxfEMBa-fTfgOAQaVt6QA/viewform", work);
    });

    await cluster.task(work);

    for (let i = 0; i < multi_rounds; i++) {
        cluster.queue("https://docs.google.com/forms/d/e/1FAIpQLSeVgCaSbnPn_JIpg20StF0JPyE76CxfEMBa-fTfgOAQaVt6QA/viewform", work);
    }

    console.log("hello");
    await cluster.idle();
    await cluster.close();

})()