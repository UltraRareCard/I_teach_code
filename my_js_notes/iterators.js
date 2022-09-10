(async function main() { // async function
    console.clear();

    //итератор
    let range = {
        from: 0,
        to: 3,
        [Symbol.iterator]() {
            return {
                current: this.from,
                last: this.to,

                next() {
                    if (this.current <= this.last) {
                        return {done: false, value: this.current++,};
                    } else {
                        return {done: true,};
                    }
                }
            }
        }
    };

    console.log(range);
    
    //явно колим метод next();
    let iterator = range[Symbol.iterator]();
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next())

    console.log("-".repeat(40));

    //итератор юзается в for of
    for (const item of range) {
        console.log(item);
    }



    //async_iterators
    console.log("-".repeat(4));
    const sleep = ms => new Promise(res => setTimeout(() => res(), ms));
    let range_async = {
        from: 0,
        to: 3,
        [Symbol.asyncIterator]() {
            return {
                current: this.from,
                last: this.to,

                async next() {
                    await sleep(400);

                    if (this.current <= this.last) {
                        return {done: false, value: this.current++,};
                    } else {
                        return {done: true,};
                    }
                }
            }
        }
    };

    for await(const item of range_async) {
        console.log("async:", item);
    }

    
})()