import fs from "fs/promises";
import path from "path";

export default async function handler(text, chat_id, {bot,}) {
    try {
        const message = await bot.sendMessage(chat_id, `desk: *${text}*`, {
            disable_notification: true,
            protect_content: true,
            parse_mode: "MarkdownV2",
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'train', callback_data: `train`}]
                ]
            }),
        });

        const active_desk = await fs.readFile(path.resolve(process.cwd(), "data", "desks", `${text}.txt`), "utf8");
        bot.active_desk = active_desk.split("\r\n").filter(str => str.trim()).map(str => str.split("-").map(side => side.trim()));
        bot.now_desk = text;

        console.log("bot.active_desk:", bot.active_desk);
        console.log("bot.now_desk:", bot.now_desk)
        return message;
    } catch(err) {
        console.log("TRAIN_ERROR:", err);
    }
}