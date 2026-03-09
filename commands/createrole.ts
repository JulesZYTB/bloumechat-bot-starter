import { PermissionFlags } from "bloumechat";
import { Command } from "../types";

export const command: Command = {
    name: "createrole",
    description: "Creates a new role.",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ This command can only be used in a server.");

        const name = args.join(" ");
        if (!name) return message.reply("❌ Usage: `!createrole [name]`");

        try {
            const role = await message.guild.createRole({
                name,
                color: "#FF0000",
                permissions: PermissionFlags.VIEW_CHANNELS | PermissionFlags.SEND_MESSAGES
            });
            await message.reply(`✅ Created role: **${role.name}** with VIEW and SEND permissions.`);
        } catch (e: any) {
            await message.reply(`❌ Error creating role: ${e.message}`);
        }
    }
};
