import { Command } from "../types";
import { EmbedBuilder } from "bloumechat";

export const command: Command = {
    name: "userinfo",
    description: "Affiche les informations d'un utilisateur.",
    async execute(client, message, args) {
        const target = message.author; // For now just the author, could be expanded to args[0]

        const embed = new EmbedBuilder()
            .setTitle(`👤 Infos de l'utilisateur : ${target.username}`)
            .setColor("#1ABC9C")
            .addFields(
                { name: "Nom d'utilisateur", value: target.username, inline: true },
                { name: "Tag", value: `#${target.tag}`, inline: true },
                { name: "ID", value: `\`${target.id}\``, inline: false },
                { name: "Bot ?", value: target.bot ? "🤖 Oui" : "👤 Non", inline: true },
                { name: "Statut Actuel", value: target.status, inline: true }
            )
            .setFooter({ text: "BloumeChat Moderation" })
            .setTimestamp();

        if (target.avatar) {
            embed.setAuthor({ name: target.username, iconUrl: target.avatar });
        }

        await message.reply("", [embed]);
    }
};
