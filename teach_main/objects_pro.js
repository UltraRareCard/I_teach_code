(function main() {
    console.clear();

    let user1 = {
        name: "John",
        age: 54,
        nick: "navigator4500",
    };


    let object_entries = Object.entries(user1);
    console.log(object_entries);

    let object_keys = Object.keys(user1);
    console.log(object_keys);

    let object_values = Object.values(user1);
    console.log(object_values);

    object_entries.push(["extra_attr",true]);

    
    let object_from_entries = Object.fromEntries(object_entries);
    console.log(object_from_entries);

    
    //деструктуризация объекта
    let options1 = {
        title: "triangle",
        width: 66,
        height: 77,
        cool: true,
        scope: "66*77*0.5",
    };


    let {title, width: w, ...rest_object} = options1;

    console.log(title, w);
    console.log(rest_object);


    //блок, скобки, как ещё назвать а - заранее объявленные переменные
    let options2 = {
        title1: "triangle",
        width1: 66,
        height1: 77,
        cool1: true,
        scope1: "66*77*0.5",
    };

    let title1, width1, height1;

   ({title1, width1, height1 = 77, } = options2); //нужно брать в скобки, чтобы работало


    //вложенная деструктуризация
    let nested_object = {
        name: "Yuri",
        age: 0,
        status: {
            gay: false,
            sp: "alone",
            lovely_smiles: ["poroSad","kekw", "kekWait"],
        }
    };


    let {name, fake_age = 77, status: {
        lovely_smiles: [smile1, smile2],
        gay,
    }} = nested_object;

    console.log(smile1,smile2);


    //Стоит передавать аргументы в виде дестракта и объекта, чтобы не засорять undifened-ами как значения по умолчанию
    function kekis({name = "noname", surname = "noname heh", age = 17, alone = true}) {
        console.log("name: ", name);
        console.log("surname: ", surname);
        console.log("age: ", age);
        console.log("alone: ", alone);
    }
    console.log("-".repeat(40));
    kekis({name: "Gostin", age: 99});

    let for_function_object = {
        name: "Tolya",
        surname: "secret",
        age: 1234,
        alone: false,
    };

    console.log("-".repeat(40));
    kekis(for_function_object);
    console.log("-".repeat(40));


    //работа с json
    let to_json_object = JSON.stringify(nested_object, null, 4);
    console.log(to_json_object);

    let from_json_object = JSON.parse(to_json_object);
    console.log(from_json_object)


    //флаги, дескриторы
    let test = {
        name: "Olge",
        age: 777,
        boo: true,
    };

    //изменить флаги
    Object.defineProperty(test, "name", {
        writable: false,
        enumerable: true,
        value: "ksy-ksy-ksy",
    });

    //получить флаги
    let name_descriptor = Object.getOwnPropertyDescriptor(test, "name");
    console.log(name_descriptor);
    // test.name = "cant change, :(";
    console.log(test);


    //массово изменить и получить флаги
    console.log("-".repeat(40));
    Object.defineProperties(test, {
        name: {
            writable: true,
            value: "first",
        },
        age: {
            writable: false,
            value: 999,
        }
    });

    let attrs_descriptors = Object.getOwnPropertyDescriptors(test);
    console.log(attrs_descriptors);


    console.log("-".repeat(40));
    test.extra = 8;
    console.log(test);


    Object.preventExtensions(test); //запрещаем добавлять новые св-ва

    try {
        test.extra1 = 88; 
    } catch(err) {

    }
    console.log(test);


    //геттеры и сеттеры
    let test_object = {
        name: "Nick",
        surname: "Nickers",

        get get_name() {
            return this.name + " " + this.surname;
        },

        set get_name(value) {
            [this.name, this.surname] = value.split(" ");
        }
    }

    test_object.get_name = "Kick Kickers";
    let wow = test_object.get_name;
    console.log(wow)

})()