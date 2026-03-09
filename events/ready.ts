import { BloumeChat } from "bloumechat";

export default {
    name: "ready",
    once: true,
    async execute(client: BloumeChat) {
        console.log("-----------------------------------------");
        console.log(`🚀 Bot connected as: ${client.user?.username}#${client.user?.tag}`);
        console.log(`🌐 Total Servers: ${client.guilds.cache.size}`);
        console.log("-----------------------------------------");

        console.log("⚙️ Setting status to 'dnd' (Do Not Disturb)...");
        await client.setStatus("dnd");
    }
};
