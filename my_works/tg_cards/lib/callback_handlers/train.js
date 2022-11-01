import {Random,} from "./../lib.js";
import {markdown_convert,} from "./../lib.js";

export default async function callback_handler(chat_id, {bot,}) {
    try {
        if (bot.active_desk.length > 0) {
            // console.log(bot.active_desk);
            const {item, i} = Random.arr_item(bot.active_desk);
            let [front, back] = item;
            front = markdown_convert(front);
            back = markdown_convert(back);

            bot.active_desk.splice(i, 1);

            let forgot = "forgot";
            if (bot.now_desk == "repeat") {
                forgot = "put away";
            };

            switch(bot.mode) {
                case("front"): {
                    const message = await bot.sendMessage(chat_id,  front + " \\- " + `||${back}||`, {
                        disable_notification: true,
                        protect_content: true,
                        parse_mode: "MarkdownV2",
                        reply_markup: JSON.stringify({
                            inline_keyboard: [
                                [{text: `${forgot}`, callback_data: `${forgot}/${item.join(" - ")}`}, {text: 'next', callback_data: 'next'}],
                            ]
                        }),
                    });
                    return message;
                    break;
                }
                case("back"): {
                    const message = await bot.sendMessage(chat_id,  back + " \\- " + `||${front}||`, {
                        disable_notification: true,
                        protect_content: true,
                        parse_mode: "MarkdownV2",
                        reply_markup: JSON.stringify({
                            inline_keyboard: [
                                [{text: `${forgot}`, callback_data: `${forgot}/${item.join(" - ")}`}, {text: 'next', callback_data: 'next'}],
                            ]
                        }),
                    });
                    return message;
                    break;
                }
                default: {

                    break;
                }
            }
        } else {
            const message = await bot.sendMessage(chat_id, `🔥🔥🔥`, {
                    disable_notification: true,
                    protect_content: true,
                    parse_mode: "MarkdownV2",
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{text: 'again', callback_data: 'again'}],
                            [{text: 'prev desk', callback_data: 'prev_desk'}, {text: 'next desk', callback_data: 'next_desk'}],
                        ]
                    }),
                });
            return message;
        }
       
    } catch(err) {
        console.log("CALLBACK_TRAIN_ERROR:", err);
    }
}