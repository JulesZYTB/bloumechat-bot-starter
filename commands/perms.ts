import { Command } from "../types";

/**
 * Command to reply with the bot's permission bitfield.
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "perms",
    description: "Replies with the bot's permission bitfield.",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ This command can only be used in a server.");

        const member = message.guild.members.cache.find((m: any) => m.user?.id === client.user?.id);

        if (member) {
            console.log(`👮 Bot Permissions: ${member.permissions}`);
            await message.reply(`👮 My Permissions Bitfield: \`${member.permissions.toString()}\``);
        } else {
            console.log("Member not found in cache.");
            await message.reply("❌ Member not found in cache.");
        }
    }
};
