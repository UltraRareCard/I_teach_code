import { markdown_convert } from "../lib.js";

export default async function callback_handler(mode, chat_id, {bot,}) {
    try {
        bot.mode = markdown_convert(mode);
        console.log(bot.mode)
        const message = await bot.sendMessage(chat_id,  `Mode: *${bot.mode}*`, {
            disable_notification: true,
            protect_content: true,
            parse_mode: "MarkdownV2",
        });
        return message;
    } catch(err) {
        console.log("CALLBACK_MODE_ERROR:", err);
    }
}