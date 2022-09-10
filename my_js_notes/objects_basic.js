(function main() {
    console.clear();

    let computed = "casino";

    let user1 = {
        name: "Bob",
        age: 54,
        "your_phrase": "what is it",
        [computed]: 777,
    };


    //delete attribute
    console.log(user1.name);
    delete user1.name;
    console.log(user1.name);

    console.log(user1["your_phrase"]);


    //computed attribute
    console.log(user1.casino);


    //check there is or no such attribute in obj
    if (user1.no_such === undefined) {console.log("no such attr");}
    if ("age" in user1) {console.log("such attr");}
    

    //object comparison
    let user2 = {
        name: "Oven",
        age: 666,
    };

    let user3 = {
        name: "Oven",
        age: 666,
    };

    let user4 = user2;

    console.log(user2 == user3);
    console.log(user2 == user4);


    //object clone
    let user5 = {};

    for (let item in user2) {
        user5[item] = user2[item];
    }
    console.log(user5);

    let user6 = Object.assign({}, user2, {nick: "Peter"});
    console.log(user6);

    let user7 = {};
    Object.assign(user7, user2, {"age_psyco": 14},);
    console.log(user7);


    //методы и this
    let user8 = {
        name: "Harry",
        age: 0,

        introduce() {
            console.log(`Yo, I'm ${this.name}, and мне ${this.age} лет`);
        }
    };


    () => {
        console.log("hellow");
    }
 
})()