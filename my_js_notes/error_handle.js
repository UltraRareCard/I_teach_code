(function main() {
    console.clear();

    //обработка ошибок
    try {
        console.log(no_such_var)
    } catch(err) {
        console.log("-".repeat(40));
        console.log("name: ", err.name);
        console.log("message: ", err.message);
        console.log("-".repeat(40));
    } finally {
        console.log("finally");
    }


    //пользовательские ошибки
    try {
        let wut = false;
        if (!wut) {
            // throw new Error("just test"); // кидаем объект ошибки
            throw 777; // кидаем намбер 777
        }

    } catch(err) {
        console.log("err: ", err)
    }

})()