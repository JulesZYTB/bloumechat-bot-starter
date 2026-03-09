import { Command } from "../types";

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
