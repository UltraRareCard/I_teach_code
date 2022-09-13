/*
    Создайте класс Phone, который содержит переменные number, model и weight.
    Создайте три экземпляра этого класса. 
    Выведите на консоль значения их переменных. 
    Добавить в класс Phone методы: receiveCall, имеет один параметр – имя звонящего. Выводит на консоль сообщение “Звонит {name}”. Метод getNumber – возвращает номер телефона. Вызвать эти методы для каждого из объектов.
    Добавьте перегруженный метод receiveCall, который принимает два параметра - имя звонящего и номер телефона звонящего. Вызвать этот метод.
    Создать метод sendMessage с аргументами переменной длины. Данный метод принимает на вход номера телефонов, которым будет отправлено сообщение. Метод выводит на консоль номера этих телефонов.
*/

(function main() {
    console.clear();

    class Phone {
        #number;
        #model;
        #weight;

        constructor(number, model, weight) {
            this.#number = number;
            this.#model = model;
            this.#weight = weight;
        }
        get number() {
            return this.#number;
        }
        set number(number) {
            this.#number = number;
        }

        get model() {
            return this.#model;
        }
        set model(model) {
            this.#model = model;
        }

        get weight() {
            return this.#weight;
        }
        set weight(weight) {
            this.#weight = weight;
        }

        
        get full_info() {
            return {
                number: this.#number,
                model: this.#model,
                weight: this.#weight,
            }
        }

        set full_info({number, model, weight}) {
            const info_obj = arguments[0];
            for (const [key, value] of Object.entries(info_obj)) {
                this[`${key}`] = value;
            }
        }

        receive_call(name, number) {
            console.log("Звонит", name, number);
        }   
        
        send_message(msg, ...numbers) {
            
            for (const item of [].concat(...numbers)) {
                console.log(msg, item);
            }
        } 

    }

    class Random {
        random(from, to) {
            return Math.floor(Math.random() * (to - from + 1) - from)
        }

        random_from(arr) {
            return arr[this.random(0, arr.length - 1)];
        }

        random_number() {
            return "+" + Math.random().toString().slice(2,13);
        }
    }
    let random = new Random;
    const phone1 = new Phone(random.random_number(), "iphone 10", "120g")
    const phone2 = new Phone(random.random_number(), "redmi 9", "100g");
    const phone3 = new Phone(random.random_number(), "samsung big", "150g");

    let phones_arr = [phone1, phone2, phone3];
    let names_arr = ["Kirill", "Ivan", "Grisha", "Nikita", "Sveta", "Sasha", "Anonymous", "FSB", "bank"];

    console.log("-".repeat(40));
    phones_arr.forEach((phone, i) => {
        console.log(`phone${i}:`, phone.full_info);
        phone.receive_call(random.random_from(names_arr), random.random_number());
        console.log("number:", phone.number);
        phone.send_message("Hello, where is my babki sucha...", random.random_number(), random.random_number(), random.random_number(), random.random_number(), random.random_number(),);
        
        console.log("-".repeat(40));
    });

    phone1.full_info = {model: "iphone 14", number: "111",};

    
})()