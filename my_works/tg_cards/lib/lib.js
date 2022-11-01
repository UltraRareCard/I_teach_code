import fs from "fs/promises";
import path from "path";

const is_desk = async function(text,) {
    try {
        let list = await fs.readdir(path.resolve(process.cwd(), "data", "desks"));
        list = list.map(file => file.replace(/\..+$/, ""));
        if (list.includes(text)) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.log("IS_DESK ERROR:", err);
    }
};

const delete_message = async function(chat_id, message_id, {bot, message_type = "message"}) {
    try {
        if (bot.last[message_type]) {
            bot.deleteMessage(chat_id, bot.last[message_type])
        }
        bot.last[message_type] = message_id;
        return true;
    } catch(err) {
        console.log("DELETE_MESSAGE ERROR:", err);
    }
};

const markdown_convert = function(text) {
    return text.replace(/[!@#$%^&*()_+-=\\/]/g, match => {
        return "\\" + match;
    })
};

const Random = class {
    static num(from,to) {
        return Math.floor(Math.random() * (to - from + 1) ) + from;
    }

    static arr_item(...rest_arr) {
        const arr = [].concat(...rest_arr);
        const i = this.num(0, arr.length - 1);
        const item = arr[i];
        return {item, i};
    }
    static str(n) {
        let res_str = "";
        let letters_arr = "qwertyuiopasdfghjklzxcvbnm123456789".split("");

        for (let i = 0; i < n; i++) {
            res_str += this.arr_item(letters_arr);
        }
        return res_str;
    }
};

export  {
    delete_message,
    is_desk,
    markdown_convert,
    Random,
}