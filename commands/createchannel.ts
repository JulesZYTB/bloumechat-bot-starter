import { Command } from "../types";

/**
 * Command to create a new text channel.
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "createchannel",
    description: "Creates a new text channel.",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ This command can only be used in a server.");

        const name = args[0];
        if (!name) return message.reply("❌ Usage: `!createchannel [name]`");

        try {
            const channel = await message.guild.createChannel({ name, type: "TEXT" });
            await message.reply(`✅ Created channel: **${channel.name}**`);
        } catch (e: any) {
            await message.reply(`❌ Error creating channel: ${e.message}`);
        }
    }
};
