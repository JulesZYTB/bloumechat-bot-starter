import { Command } from "../types";

/**
 * Command to clear a specific number of messages.
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "clear",
    description: "Clears a specific number of messages.",
    async execute(client, message, args) {
        const guild = message.guild;
        if (!guild) return message.reply("❌ This command can only be used in a server.");

        const count = parseInt(args[0]);
        if (isNaN(count) || count < 1 || count > 100) {
            return message.reply("❌ Usage: `!clear [1-100]`");
        }

        let botMember = guild.members.cache.find((m: any) => m.user?.id === client.user?.id);
        if (client.user && botMember) {
            try {
                botMember = await guild.members.fetch(guild.id, client.user.id);
            } catch (e) {
                console.error("Failed to refresh bot member:", e);
            }

            const MANAGE_MESSAGES = 1n << 8n;
            const ADMINISTRATOR = 1n << 31n;
            const isAdmin = (botMember.permissions & ADMINISTRATOR) === ADMINISTRATOR;
            const hasPerm = (botMember.permissions & MANAGE_MESSAGES) === MANAGE_MESSAGES;

            if (!isAdmin && !hasPerm) {
                return message.reply(`❌ I do not have permission to delete messages.\nMissing: \`MANAGE_MESSAGES\``);
            }
        }

        try {
            const messages = await message.channel.fetchMessages(count + 1);
            const messageIds = messages.map((m: any) => m.publicId);

            await message.channel.bulkDelete(messageIds);
            const reply = await message.channel.send(`✅ Deleted ${messageIds.length - 1} messages.`);

            setTimeout(() => {
                reply.delete().catch(() => { });
            }, 3000);

        } catch (error) {
            console.error("Clear error:", error);
            await message.reply("❌ Failed to delete messages.");
        }
    }
};
