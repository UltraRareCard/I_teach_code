"use strict";
import TelegramBot from "node-telegram-bot-api";
import chalk from "chalk";
import path from "path";
import fs from "fs/promises";
import {config,} from "dotenv";
config();

import commands from "./lib/config/commands.js";
import {delete_message, is_desk} from "./lib/lib.js";

import mode_handler from "./lib/text_handlers/mode.js";
import desks_handler from "./lib/text_handlers/desks.js";
import train_handler from "./lib/text_handlers/train.js";

import mode_callback_handler from "./lib/callback_handlers/mode.js";
import train_callback_handler from "./lib/callback_handlers/train.js";

const bot = new TelegramBot(process.env.token, {
    polling: true,
});

bot.mode = "front";
bot.last = {
    mode: null,
    message: null,
    inline_keyboard: null,
};
bot.active_desk = [];
bot.now_desk = [];

(async function main() {
    console.clear();

    bot.on("text", async msg => {
        const text = msg.text;
        const chat_id = msg.chat.id;

        switch(text.trim()) {
            case("/mode"): {
                const message_type = text.replace(/\//, "");
                const {message_id} = await mode_handler(text, chat_id, {bot,});
                await delete_message(chat_id, message_id, {bot, message_type,})
                break;
            }
            case("/desks"): {
                const message_type = text.replace(/\//, "");
                const {message_id}  = await desks_handler(text, chat_id, {bot,});
                await delete_message(chat_id, message_id, {bot, message_type,})
                break;
            }
            default: {
                const is_desk_res = await is_desk(text);
                if (is_desk_res) {
                    const {message_id} = await train_handler(text, chat_id, {bot})
                    // await delete_message(chat_id, message_id, {bot, message_type: "train",})
                    break;
                }
                break;
            }
        }
    });

    bot.on("callback_query", async msg => {
        const chat_id = msg.message.chat.id;
        const callback_data = msg.data;
        
        if (/^mode\//.test(callback_data)) {
            const mode = callback_data.replace(/^.+\//, "");
            const {message_id} = await mode_callback_handler(mode, chat_id, {bot,})
            await delete_message(chat_id, message_id, {bot, message_type: "mode",})
        }

        if(/^train$/.test(callback_data)) {
            const message = await train_callback_handler(chat_id, {bot,});
            if (message) {
                const {message_id} = message;
                await delete_message(chat_id, message_id, {bot, message_type: "train",})
            }
        }

        if(/^next$/.test(callback_data)) {
            const message = await train_callback_handler(chat_id, {bot,});
            if (message) {
                const {message_id} = message;
                await delete_message(chat_id, message_id, {bot, message_type: "train",})
            } else {
                await delete_message(chat_id, null, {bot, message_type: "train",})
            }
        }

        if(/^prev_desk$/.test(callback_data)) {
            let list = await fs.readdir(path.resolve(process.cwd(), "data", "desks"));
            list = list.map(file => file = file.replace(/\..+$/, "")).sort((a,b) => a - b)

            const prev_index = list.indexOf(bot.now_desk) - 1;

            if (prev_index >= 0) {
                const {message_id} = await train_handler(list[prev_index], chat_id, {bot})
                await delete_message(chat_id, message_id, {bot, message_type: "train",})
            } else {
            }
        } 

        if(/^next_desk$/.test(callback_data)) {
            let list = await fs.readdir(path.resolve(process.cwd(), "data", "desks"));
            list = list.map(file => file = file.replace(/\..+$/, "")).sort((a,b) => a - b)
            
            const next_index = list.indexOf(bot.now_desk) + 1;

            if (next_index < list.length) {
                const {message_id} = await train_handler(list[next_index], chat_id, {bot})
                await delete_message(chat_id, message_id, {bot, message_type: "train",})
            } else {
                
            }
        } 

        if(/^forgot/.test(callback_data)) {
            const item = callback_data.replace(/^.+\//, "");
            fs.appendFile(path.resolve(process.cwd(), "data", "desks", "repeat.txt"), (item + "\r\n"));

            const message = await train_callback_handler(chat_id, {bot,});
            if (message) {
                const {message_id} = message;
                await delete_message(chat_id, message_id, {bot, message_type: "train",})
            } else {
                await delete_message(chat_id, null, {bot, message_type: "train",})
            }
        }

        if(/^put away/.test(callback_data)) {
            const item = callback_data.replace(/^.+\//, "");
            let repeat_list = await fs.readFile(path.resolve(process.cwd(), "data", "desks", `repeat.txt`), "utf8");
            repeat_list= repeat_list.split("\r\n").filter(str => str.trim()).map(str => str.trim());

            const item_index = repeat_list.indexOf(item);

            repeat_list.splice(item_index, 1);
            await fs.writeFile(path.resolve(process.cwd(), "data", "desks", `repeat.txt`), repeat_list.join("\r\n"));

            const message = await train_callback_handler(chat_id, {bot,});
            if (message) {
                const {message_id} = message;
                await delete_message(chat_id, message_id, {bot, message_type: "train",})
            } else {
                await delete_message(chat_id, null, {bot, message_type: "train",})
            }
        }

        if(/^again$/.test(callback_data)) {
            const {message_id} = await train_handler(bot.now_desk, chat_id, {bot})
            await delete_message(chat_id, message_id, {bot, message_type: "train",})
        } 

    })
    
})()