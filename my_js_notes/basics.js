(function main() {

    console.clear();
    
    //авто-преобразование в числа при арифметич операциях (искл: конкатенация строк)
    let a = 6 / "3";
    console.log(a);

    //краткая запись в 16,8 и 2 СИ
    let hexidecimal_number = 0x4d;
    let octal_number = 0o115;
    let binary_number = 0b1001101;

    console.log(`0x: ${hexidecimal_number}, \n0o: ${octal_number}, \n0b: ${binary_number}`)

    //запись в любой СИ: например двоичной
    let ms = 77;
    console.log(ms.toString(2));

    //число вместо переменной = нужно две точки
    console.log(666..toString(2));

    //методы с Number:
    let num_for_parse = "88px";
    console.log(parseInt(num_for_parse));

    
    let one_is = "";
    let two_is = 0;

    console.log(one_is == two_is);

    console.log(Object.is(one_is, two_is));
    console.log(one_is === two_is);
    
    //switch
    let switch_test = 7;

    switch(switch_test) {
        case 0: 
            console.log("0");
            break;
        //группировка нескольких cases
        case 7:
        case 8:
            console.log("7 or 8");
            break;
        //все остальные варианты
        default:
            console.log("other");
    }


})()