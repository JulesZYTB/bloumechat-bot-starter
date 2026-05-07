import { Command } from "../types";
import { EmbedBuilder } from "bloumechat";

export const command: Command = {
    name: "avatar",
    description: "Affiche l'avatar d'un utilisateur.",
    async execute(client, message, args) {
        const avatarUrl = message.author.avatar || "https://bloumechat.com/logo.png";

        const embed = new EmbedBuilder()
            .setTitle(`🖼️ Avatar de ${message.author.username}`)
            .setColor("#E91E63")
            .setAuthor({ name: message.author.username, iconUrl: avatarUrl })
            .setDescription(`[Lien direct vers l'avatar](${avatarUrl})`)
            .setFooter({ text: "BloumeChat Moderation" })
            .setTimestamp();

        await message.reply("", [embed]);
    }
};
