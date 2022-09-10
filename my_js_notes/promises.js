(async function main() {
    console.clear();

    const sleep = ms => new Promise(res => setTimeout(() => res(), ms));

    let promise1 = await new Promise((res, rej) => {
        console.log("promise1: 1");
        res(777);
    })
    .then(
        (res => {
            console.log(res);
            return new Promise((res, rej) => {
                console.log("promise1: 2");
            })
        }),
        (rej => {
            console.log("error: ", rej);
        }),
    )

    console.log(promise1);
})()