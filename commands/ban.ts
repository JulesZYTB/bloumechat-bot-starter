import { Command } from "../types";

/**
 * Command to ban a specified user.
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "ban",
    description: "Bans a specified user.",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ This command can only be used in a server.");

        const userId = args[0];
        if (!userId) return message.reply("❌ Usage: `!ban [userPublicId]`");

        try {
            const memberToBan = await client.members.fetch(message.guild.id, userId);
            await memberToBan.ban({ reason: "Testing SDK Ban" });
            await message.reply(`✅ Banned user **${userId}**.`);
        } catch (e: any) {
            await message.reply(`❌ Error banning user: ${e.message}`);
        }
    }
};
