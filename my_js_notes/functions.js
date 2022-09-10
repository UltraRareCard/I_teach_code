(function main() {
    console.clear();

    //остаточные параметры
    function test(a,b, ...rest_args) {
        console.log("a: ", a);
        console.log("b: ", b);
        console.log(rest_args);
    }
    test(1,2,3,4,5,6,88);

    //just instance
    function sum(...rest_args) {
        let sum = 0;
        for (let arg of rest_args) {
            sum += arg;
        }
        return sum;
    }
    console.log(sum(1,2,3,4,5));

    //var "arguments"
    function check_arguments(a,) {
        console.log(Array.from(arguments)); //arguments - псевдомассив, так что юзаю Array.from, чтобы получить массивчик плотный такой
        console.log("len: ", arguments.length);
    }
    check_arguments(77,66,55,44,33,22,11, "hello");

    //Оператор расширения
    console.log("-".repeat(40));
    let arr = [1,2,3,44,5,6,7,8,9,true];

    let max = Math.max(...arr);
    console.log("max: ", max);


    //new Function - функция из строки
    let func = new Function("a","b", "return a + b");
    console.log(func(1,3));


    //setTimeout
    // let timer_id = setTimeout(function kekis(a) {
    //     console.log(a * 10);
    //     if (a * 10 == 50) {
    //         clearTimeout(timer_id);
    //         return true;
    //     } 
    //     timer_id = setTimeout(kekis,500, ++a);

    // }, 500, 1);


    //call, apply

    function wow(message) {
        console.log(this.name + " " + message);
    }

    let wow_obj = {
        name: "Kris",
        age: 54,
    };

    wow.call(wow_obj, "иди нахуй отседова");

    //привязка контекста
    let user = {
        name: "Ivan",
        age: 22,

        say_hello() {
            console.log(this.name + ": hello braza");
        }
    }

    user.say_hello();
    // // проблема - при передачи метода, теряется контекст объекта юзер и this. будет undefined
    // let timer_id = setTimeout(user.say_hello, 300);
    // console.log("-".repeat(40));

    // //решение, привязка контекста с bind
    // let say_hello_user = user.say_hello.bind(user);
    // let timer_id2 = setTimeout(say_hello_user, 300);


    //можем привязать аргументы
    function addition(a,b) {
        console.log(a + b);
    }

    let addition_a = addition.bind(null, 7);
    addition_a(2);
    addition_a(3);
    addition_a(4);

    console.log("-".repeat(40));

    
    //у стрелочных фантиков нету this, они берут его из внешнего фантика
    let arrow_object = {
        name: "Hell",
        age: 54,
        lovely_smiles: ["kekw", "kekwait", "porosad"],

        say_something() {
            this.lovely_smiles.forEach((item) => {
                console.log(this.name + ": " + item);
            })
        }
    }

    arrow_object.say_something();

    


})()