/*
    создать классы Car, Engine, Wheel;
    в каждый класс добавить метод work() с каким-либо console.log();
    создать внутри класса Car экземпляры engine и 4 wheels,
    создать снаружи класс и экземпляр класса Fresher -> добавить в класс Car этот экземпляр
    вызвать метод work()
   */
(function main() {
    console.clear();
    class Wheel {
            work() {
                console.log("Колесо крутится");
            }
   }

    class Engine {

            work() {
                console.log("Engine working");
            }
        }

    class Car {
        #engine;
        #wheels_arr = [];
        #freshener;

        constructor(freshener) {
            this.#engine = new Engine();

            this.#wheels_arr.push(new Wheel());
            this.#wheels_arr.push(new Wheel());
            this.#wheels_arr.push(new Wheel());
            this.#wheels_arr.push(new Wheel());

            this.#freshener = freshener
        }

        work() {
            console.log("start work");
            this.#freshener.work();
            this.#engine.work();
            
            for (const item of this.#wheels_arr) {
                item.work();
            }
        }
    }


    class Freshener {
        work() {
            console.log("-just fresher");
        }
    }

    let freshener = new Freshener;

    let car = new Car(freshener);

    car.work();

   
})()