//npm i
import {MatchChecker, } from "./lib.js";

(async function main() {
    console.clear();
    
    const match_checker = new MatchChecker();
    match_checker.check_match();
})()