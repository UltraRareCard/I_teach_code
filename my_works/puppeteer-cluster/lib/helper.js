//sleep(ms), range(from,to), random_generator,

const sleep = ms => new Promise(res => setTimeout(() => res(ms), ms));


const range = (from, to) => Array.from({
    from,
    to,
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
});

const Random = class {
    static num(from,to) {
        return Math.floor(Math.random() * (to - from + 1) ) + from;
    }

    static arr_item(...rest_arr) {
        const arr = [].concat(...rest_arr);
        return arr[this.num(0, arr.length - 1)]
    }
    static str(n) {
        let res_str = "";
        let letters_arr = "qwertyuiopasdfghjklzxcvbnm123456789".split("");

        for (let i = 0; i < n; i++) {
            res_str += this.arr_item(letters_arr);
        }
        return res_str;
    }
}
export {
    Random,
    sleep,
    range,
}