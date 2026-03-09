import { Command } from "../types";

export const command: Command = {
    name: "ping",
    description: "Replies with Pong!",
    async execute(client, message, args) {
        console.log("➡️ Replying with Pong!");
        await message.reply("Pong! 🏓");
    }
};
