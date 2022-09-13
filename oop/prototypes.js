(function main() {
    console.clear();

    //у объектов есть скрытое св-во прототип: [[prototype]], котор. ссылается на прототип функции конструктора, с помощью котор объект был создан
    let user = {
        access: "lvl 1",
        site_user: true,
        nick: "Livalll",

        intro() {
            console.log(this.nick, "says: Hello!");
        }
    };

    let user_prototype = Object.getPrototypeOf(user); // получает прототип объекта
    console.log(user_prototype);

    let admin = {
        access: "lvl 3",
        nick: "god",
        admin: true,
    };

    Object.setPrototypeOf(admin, user); // устанавливаем объекту admin прототип - user;
    // теперь в admin можем юзать методы и св-ва из user, можем переназначать их.

    user.intro(); //Livalll says: Hello!
    admin.intro(); //god says: Hello!

    console.log(admin.site_user); // true
    console.log(admin.access); // lvl 3

    //проверяем, является ли св-во ЛИЧНЫМ для admin = true, или оно взято из прототипа = false
    console.log(admin.hasOwnProperty("nick")); //true
    console.log(admin.hasOwnProperty("site_user")); //false
    
    //for in - перечисляет кроме своих св-в ещё и с протопипа 
    for (const item in admin) { // access, nick, admin, site_user_ intro
        console.log(item);
    }

    //у объектов может быть лишь ОДИН прототип, нельзя назначить несколько

    //св-ва из протипа только для чтения. Изменения и удаления св-в относятся к объекту (не прототипу)
    admin.site_user = false; // для admin создаётся новое своё св-во site_user, в протоипе оно не трогается
    console.log(admin.site_user); //false
    console.log(user.site_user); //true

    delete admin.site_user; //удалили св-во у admin - и теперь оно снова берётся из протипа
    console.log(admin.site_user); //true

    //по умолчанию объекту прототипом назначается прототип функции-конструктора, с хелпой котор он был создан F.prototype
    let obj1 = {
        age: 77,
    };
    let num = 1234;
    let str = "stringgg";
    console.log(Object.getPrototypeOf(obj1) == Object.prototype); //true
    console.log(Object.getPrototypeOf(num) == Number.prototype); //true
    console.log(Object.getPrototypeOf(str) == String.prototype); //true

    
    class User {
        constructor(name) {
            this.name = name;
        }

        get_name() {
            return this.name;
        }
    }
    //по умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.
    let User_constructor = User.prototype.constructor;  //constructor класса User
    console.log(User_constructor == User); //true

    let user1 = new User("Kirill");
    console.log("user1:",user1);

    let user2 = new User_constructor("Ivan"); //можем даже так создать объект, тк constructor ссылается на функцию-конструктор
    console.log("user2:",user2);

})()