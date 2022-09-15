import EventEmitter from "events";

(function main() {
    console.clear();
    
    class FirstInstance extends EventEmitter{};
    class SecondInstance extends EventEmitter{};

    const first_instance = new FirstInstance();
    const second_instance = new SecondInstance();

    first_instance.on("one", (data) => {
        console.log("data_one:", data);
    })

    first_instance.on("one", (data) => {
        console.log("Replaced data_one:", data);
    })
    
    first_instance.addListener("kekis", (data) => {
        console.log("kekis:", data);
    })

    first_instance.emit("one", "this is data");

    let wow1 = first_instance.getMaxListeners();
    console.log(wow1);
    let wow2 = first_instance.eventNames();
    console.log(wow2)
    
})()

