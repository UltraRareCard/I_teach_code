/*
    Создать класс Animal и расширяющие его классы Dog, Cat, Horse.
    Класс Animal содержит переменные food, location и методы makeNoise, eat, sleep. Метод makeNoise, например, может выводить на консоль "Такое-то животное спит". 
    Dog, Cat, Horse переопределяют методы makeNoise, eat. 
    Добавьте переменные в классы Dog, Cat, Horse, характеризующие только этих животных.
    Создайте класс Ветеринар, в котором определите метод void treatAnimal(Animal animal). Пусть этот метод распечатывает food и location пришедшего на прием животного.
*/
(function main() {
    class Animal {
        _food;
        _location;
        
        constructor(food, location) {
            this._food = food;
            this._location = location;
        }

        get food() {
            return this._food;
        }
        
        get location() {
            return this._location;
        }
        make_noise() {
            console.log("Buuuuuaaaa");
        }

        eat() {
            console.log("om nom nooom");
        }

        sleep() {
            console.log("Slepping zzzzzZZZZZZ")
        }
    }

    class Dog extends Animal {
        make_noise() {
            console.log("Bark Bark Bark!")
        }
    }

    class Cat extends Animal {

        make_noise() {
            console.log("Myaaaaauu Myaaaaaau");
        }
    }

    class Surgeon {
        treat_animal(animal) {
            console.log("It's eating:", animal.food, "and it's live in", animal.location);
        }
    }


    let cat = new Cat("fish", "flat, on my cloth");
    let dog = new Dog("meat", "flat, of floor");

    let surgeon = new Surgeon;

    surgeon.treat_animal(cat);
    surgeon.treat_animal(dog);

})()