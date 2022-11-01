export default async function handler(text, chat_id, {bot,}) {
    try {
        const message = await bot.sendMessage(chat_id, "*Pick mode*", {
            disable_notification: true,
            protect_content: true,
            parse_mode: "MarkdownV2",
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'front', callback_data: 'mode/front'}, {text: 'back', callback_data: 'mode/back'}],
                    // [{text: 'front-back', callback_data: 'mode/front-back'}],
                ]
            }),
        });
        return message;
    } catch(err) {
        console.log("MODE_ERROR:", err);
    }
}