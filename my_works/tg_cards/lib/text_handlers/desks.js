import fs from "fs/promises";
import path from "path";

export default async function handler(text, chat_id, {bot,}) {
    try {
        let list = await fs.readdir(path.resolve(process.cwd(), "data", "desks"));
        list = list.map(file => {
            file = file.replace(/\..+$/, "");
            if (file.includes("repeat")) {
                file = "0 " +  `👉 \`${file}\``;
            }
            return file;
        }).sort((a,b) => a - b).map( file => "📂" + `*${file}*`).join("\n");
    
        const message = await bot.sendMessage(chat_id, list, {
             disable_notification: true,
            protect_content: true,
            parse_mode: "MarkdownV2",
        });
        return message;
    } catch(err) {
        console.log("DESKS_ERROR:", err);
    }
}