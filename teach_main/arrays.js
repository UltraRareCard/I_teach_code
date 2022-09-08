(function main() {
    console.clear();

    let arr1 = [1,2,3];
    let arr2 = [4,5,6];
    let arr3 = [7,8,9];


    let arr_concat = arr1.concat(arr2, arr3[0]);
    console.log(arr_concat);


    let arr_slice = arr1.slice(0,2);
    console.log(arr_slice);


    arr1.forEach((item, i, arr) => {
        console.log(`item: ${item}, index: ${i}, array: ${arr}`); 
    });


    let arr_map = arr1.map((item) => {
        return item * 10;
    });
    console.log(arr_map);

    
    console.log(arr2.indexOf(5));
    console.log(arr2.includes(6));


    let find_item = arr1.find((item, i) => {

        if (item == 3) {
            return item
        }
    });
    console.log(find_item);

    let not_find_item = arr1.find((item, i) => {

        if (item == 4) {
            return item
        }
    });
    console.log(not_find_item); //undefined


    let filter_arr = arr1.filter((item, i) => {
        if (item % 2 == 1) {
            return item
        }
    });
    console.log(filter_arr);


    let rev_arr = arr1.reverse();
    console.log(rev_arr);

    let string = "hello man kappa kappa hey gear my tooo";
    let split_arr = string.split(" ");
    console.log(split_arr);

    let join_arr = split_arr.join(" ");
    console.log(join_arr);


    //ALARM - reduce 
    let mega_arr = [1,2,3,4,5,6,7,8,9,10];
    let first_target = 100;
    let reduced_arr = mega_arr.reduce((accum, item, i, arr) => {

        return accum + item;
    }, first_target);

    console.log(reduced_arr);


    let arr11 = arr1;
    console.log(arr11 == arr1);

    let arr22 = Object.assign([], arr2);
    console.log(arr22);

    //если хотя бы 1 айтем удовлетворяет условию = true
    let some_arr = arr1.some((item,i) => {
        if (item == 4 ) {
            return true
        }
    });
    console.log(some_arr);

    //если каждый айтем удовлетворяет условию = true
    let every_arr = arr1.every((item, i) => item > 0);
    console.log(every_arr);


    let arr_from_arr = Array.from([...arr1, ...arr2]);
    console.log(arr_from_arr);

    let arr_from_string = Array.from("hello");
    console.log(arr_from_string);

    
    //возвращают Итератор Массива - так что надо юзать Array.from()
    let arr_entries = arr1.entries();
    console.log(Array.from(arr_entries));

    let arr_keys = arr1.keys();
    console.log(Array.from(arr_keys));

    let arr_values = arr1.values();
    console.log(Array.from(arr_values));


    //деструктуризация
    let arr = ["one","two",false, 777, "Poher tancuiteeee"];

    let [one, two, boolean] = arr;
    console.log(one);

    
    //деструктуризация со split
    let random_name = "Holem Taun";

    let [name, surname] = random_name.split(" ");
    console.log(name);
    console.log(surname);


    //пропуск элемента - пропускаем two
    let [one1, , boolean1] = arr;
    console.log(boolean1);


    //Работает с любым перебираемым объектом с правой стороны
    let [a,b,c] = "abc";
    console.log(a, b , c);


    //дестрактинг в цикле из массива пар ключ-валуев
    let user1 = {
        name: "Nikoooolai",
        age: 54,
        balumba: true,
    };


    for (let [key,value] of Object.entries(user1)) {
        console.log(key + "__" + value);
    }


    //хитро-обмен переменными
    [one, two] = [two, one];
    console.log(one);
    console.log(two);


    //остаточные параметры - сохраняются в массив + значение по умолчинаю
    let [one2, two2, ...rest_arr] = arr;
    console.log(rest_arr);

    let [first, second = "2222 2222"] = ["1234"];
    console.log(second);



})()