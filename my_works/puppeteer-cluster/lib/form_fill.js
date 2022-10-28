"use strict";
import puppeteer from "puppeteer";
import {Cluster, } from "puppeteer-cluster";
import chalk from "chalk";

import {sleep,} from "./helper.js";

export default async function work({page, data: url, worker}) { 
    
    // const url = "https://docs.google.com/forms/d/e/1FAIpQLSeVgCaSbnPn_JIpg20StF0JPyE76CxfEMBa-fTfgOAQaVt6QA/viewform";
    let driver = await page.browser();
    
    try {
        // driver = await puppeteer.launch({
            // headless: false,
        //     defaultViewport: null,
        // });

        // let [page] = await driver.pages();
        await page.setDefaultNavigationTimeout(10 * 1000);
        await page.setDefaultTimeout(10 * 1000);

        await page.goto(url);
        await page.waitForNavigation(); 

        const [inputs, checkboxes, [button]] = await Promise.all([
            page.$x("//div[@role = 'listitem']//*[self::input or self::textarea]"),
            page.$x("//div[@role = 'listitem']//div[@role = 'checkbox']"),
            page.$x("//div[@role = 'button']")
        ]);

        for (const input of inputs.slice(0, inputs.length - 1)) {
            await input.type("hello pup", {delay: 5});
        }

        await checkboxes[0].click();
        await checkboxes[2].click();
        await checkboxes[4].click();

        await button.click();
        await page.waitForNavigation();

    } catch(err) {
        // console.log(chalk.red(err));
    } finally {
        // await driver.close();
    }
}