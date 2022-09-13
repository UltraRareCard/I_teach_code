(function main() {
    console.clear();

    // функция конструктор: 1- с большой буквы, 2 - при создании экземпляра пишем "new"
    function User(nick) { 
        //тут создаётся this для объекта
        //дальше выполняется код, присваиваются св-ва и методы
        this.nick = nick;
        this.access = "lvl 1";
        this.site_user = true;

        this.intro = function() {
            console.log(this.nick, "says: Hello!");
        }
        //после кода функция-конструктор НЕЯВНО возвращает созданный this или объект, которые мы возвращаем ЯВНО
        //если мы ЯВНО вернём что-то кроме объекта (примитив например) - return проигнорируется и вернётся this

        // this.return_test = true; //раскомментирование = мы явно вернём объект вместо this

        if (this.return_test) {
            return {
                nothing: "really nothing here",
            }
        }
    }

    let user1 = new User("Gideon");
    console.log("user1:", user1);

    let user2 = new User("Bruce");
    console.log("user2:", user2);

})()