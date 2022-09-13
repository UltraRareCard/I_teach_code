(function main() {
    console.clear();

    class User {
        access = "lvl 1" //задаём св-во для объектов, созданных этим классом
        fight_strength = Math.random().toFixed(2);

        static warrior = true; //статичное св-во - присваивается КЛАССУ, А НЕ ОБЪЕКТАМ ОТ КЛАССА
        static fight(user1, user2) { //статичный метод, также присваивается классу
            if (user1.fight_strength > user2.fight_strength) {
                console.log("user1 - won!");
            } else if (user1.fight_strength < user2.fight_strength) {
                console.log("user2 - won!")
            } else {
                console.log("НИЧЬЯ - draw - tie!");
            }
        }
        constructor(nick) { //конструктор, как в функциях-конструкторах
            this.nick = nick;
            this.site_user = true;
        }

        intro() { // задаём метод для объектов, созданных этим классом
            console.log(this.nick, "says: Hello!");
        }
    }

    //под капотом, класс User создаёт функцию User, котор ставновится результатом объявляения класса
    //код для фукнции берётся из constructor
    //методы и св-ва не из конструктора записываются в User.prototype

    let user1 = new User("Gideon");
    console.log("user1:", user1);

    let user2 = new User("Bruce");
    console.log("user2:", user2);

    //extends означает, что класс Moderator наследуется от класса User
    class Moderator extends User { //под капотом происходит: Moderator.prototype = User.prototype
        access = "lvl 2" //переназначаем 

        //автоматически используется constructor из родительского класса, не нужно его указывать, если не нужно дополнить или изменить его для данного класса.  
        moderate() {
            console.log("Moderating: ban for your spam, man...");
        }

        work() {
            console.log("Working for 8 hours...");
        }

    }

    let moderator1 = new Moderator("Nikolai");
    console.log("moderator1:", moderator1);
    moderator1.intro(); // у модератора нет такого метода, и он ищет его из прототипа - наследованного класса выше - User


    class Admin extends Moderator {
        access = "lvl3"
        static warrior = false;

        constructor(nick, work_experience) { //объявляем свой constructor для Admin, вместо родительского constructor
            // Когда выполняется обычный конструктор, он создаёт пустой объект и присваивает его this .
            // Когда запускается конструктор унаследованного класса, он этого не делает. Вместо этого он ждёт, что это сделает конструктор родительского класса.
            //если мы создаём собственный конструктор, мы должны вызвать super(args) в начале конструктора, в противном случае объект для this не будет создан, и мы получим ошибку
            super(nick);
            this.work_exexperience = work_experience +" years";
        }
        work() { //переназначаем метод
            console.log("Moderators working instead of me...")
        }

        intro() { //переназначаем метод
            super.intro(); //чтобы вызвать метод из родительского класса User - используем слово super.method_from_parent_class()
            console.log("and I am ADMIN!!!");
        }
    }

    let admin1 = new Admin("Gleb", 3);
    console.log("admin1:", admin1);
    admin1.intro();

    //у стрелочных функций нету super...

    console.log(user1.fight_strength);
    console.log(user2.fight_strength);
    
    User.fight(user1,user2);
    User.fight(user1,moderator1);

    //static св-ва также наследуются КЛАССАМ, но не ОБЪЕКТАМ от этих классов
    console.log(User.warrior); //true
    console.log(Moderator.warrior); //true
    console.log(Admin.warrior); //false, тк переназначали это св-во

    Admin.fight(user2,moderator1);

    console.log("instanceof admin1 from Admin:",admin1 instanceof Admin); //instanceof проверяет, является ли объект от этого класса
    console.log("instanceof admin1 from User:",admin1 instanceof User); // или он наследованного класса
    console.log("instanceof moderator1 from Admin:",moderator1 instanceof Admin); // false, тк модератор не принадлежит и не наследуется от класса Admin 
    
    //защищённые и приватные св-ва
    class Anonymous {

        constructor(rank) {
            this.rank = rank;
        }

        //защищённое св-во начинается с "_", чтобы нельзя было его прочитать потом как .mask_color другим людям
        _mask_color = "white" //типа "_" в начале названия св-ва защищает от такого чтения
        //такие св-ва также наследуются

        #name = "Gloria"; //приватное св-во - оно доступно только ВНУТРИ ДАННОГО КЛАССА. Снаружи класса или в наследованном классе - недоступно

        #get_name() {
            console.log("name:", this.#name);
        }

        get_name() { //одновременно может быть несколько методов с одинак именем, тк тот метод приватный, а это публичный
            console.log("fake function");
        }

        call_get_name() {
            console.log("Вызываем изнутри метод get_name");
            this.#get_name();
        }

        //чтобы читать и изменять защищённые св-ва, 
        get mask_color() {
            return this._mask_color;
        }

        set mask_color(color) { //если мы хотим сделать защищённое св-во только для чтения, то нужно задать только геттер, без сеттера
            this._mask_color = color.trim();
        }

    }

    let anonymous1 = new Anonymous("user");
    console.log("anonymous1:",anonymous1);
    anonymous1.mask_color = "black";
    console.log(anonymous1.mask_color); //black

    // console.log(anonymous1.#name); //пробуем вызвать приватное св-во - нельзя!
    // console.log(anonymous1["#name"]); // и так нельзя
    // console.log(anonymous1["name"]); // и так нельзя
    // anonymous1.#get_name(); //пробуем вызвать приватный метод - нельзя!
    anonymous1.call_get_name(); //схитрили так, чтоб вызвать
    anonymous1.get_name(); //вызываем похожий, но публичный метод

})()