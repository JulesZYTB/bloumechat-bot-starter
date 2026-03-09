import { Command } from "../types";

/**
 * Command to reply with Pong!
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "ping",
    description: "Replies with Pong!",
    async execute(client, message, args) {
        console.log("➡️ Replying with Pong!");
        await message.reply("Pong! 🏓");
    }
};
