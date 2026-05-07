import { Command } from "../types";
import { EmbedBuilder } from "bloumechat";

export const command: Command = {
    name: "serverinfo",
    description: "Affiche les informations du serveur.",
    async execute(client, message, args) {
        // Si la commande n'est pas lancée sur un serveur, on annule
        if (!message.guild) {
            return message.reply("❌ Cette commande doit être utilisée sur un serveur.");
        }

        const embed = new EmbedBuilder()
            .setTitle(`ℹ️ Infos du Serveur : ${message.guild.name}`)
            .setDescription(`Voici les informations principales du serveur **${message.guild.name}**.`)
            .setColor("#00AAFF")
            .addFields(
                { name: "👑 Propriétaire (ID)", value: `\`${message.guild.ownerId}\``, inline: true },
                { name: "🆔 ID du Serveur", value: `\`${message.guild.id}\``, inline: true }
            )
            .setFooter({ text: "BloumeChat Moderation" })
            .setTimestamp();

        if (message.guild.icon) {
            embed.setAuthor({ name: message.guild.name, iconUrl: message.guild.icon });
        }

        await message.reply("", [embed]);
    }
};
