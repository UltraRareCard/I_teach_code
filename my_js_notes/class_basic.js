(function main() {
    console.log();

    //функция-конструктор
    function User(name,age) {
        //создаётся {} this
        this.name = name;
        this.age = age;

        this.intro = function() {
            console.log(this.name, this.age);
        };

        //до конца выполняется код и this заполняется св-ами и методами

        //возвращается неявно this или явно ретурненный обоъект
        if (this.name == "return_obj") {
            return {
                what: 777,
                intro() {
                    console.log("Явно вернули обж вместо this из констракта");
                }
            }
        }
    }

    let user1 = new User("return_obj", 12);
    user1.intro();

    let user2 = new User("return_this", 6);
    user2.intro();

    //классы
    class User_class {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        intro() {
            console.log("class:", this.name, this.age);
        }
    }

    let user3 = new User_class("John", 14);
    user3.intro();


    for (const item in user1) {
        console.log("fn_const:", item);
    }
    
    for (const item in user3) {
        console.log("class:", item);
        //методы не выводятся, их флаг enumerable = false при создании
    }

    //проверка обж на класс
    console.log(user3 instanceof User_class);


})();