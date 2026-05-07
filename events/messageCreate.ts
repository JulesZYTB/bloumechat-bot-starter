import { BloumeChat, Message } from "bloumechat";
import { commands } from "../index";

/**
 * Event handler for the 'messageCreate' event.
 * This event is triggered when a new message is created in a server.
 *
 * @export
 * @default
 * @type {object}
 * @property {string} name - The name of the event.
 * @property {function(BloumeChat, Message): Promise<void>} execute - The function to execute when the event is triggered.
 */
let executionCount = 0;

export default {
    name: "messageCreate",
    async execute(client: BloumeChat, message: Message) {
        executionCount++;
        // Ignore bot messages
        if (message.author.bot) return;

        const os = require("os");
        console.log(`[EXEC #${executionCount}] [${os.hostname()}] [PID: ${process.pid}] 📩 [${message.channel.id}] ${message.author.username}: ${message.content}`);

        const prefix = "!";
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command = commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            await message.reply("❌ There was an error executing that command!");
        }
    }
};
