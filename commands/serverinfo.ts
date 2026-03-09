import { Message, EmbedBuilder } from "bloumechat";

export const execute = async (message: Message, args: string[]) => {
    // Si la commande n'est pas lancée sur un serveur, on annule
    if (!message.guild) {
        return message.reply("Cette commande doit être utilisée sur un serveur.");
    }

    const embed = new EmbedBuilder()
        .setTitle(`ℹ️ Infos du Serveur : ${message.guild.name}`)
        .setDescription(`Voici les informations principales du serveur **${message.guild.name}**.`)
        .setColor("#00AAFF")
        .addFields(
            { name: "👑 Propriétaire (ID)", value: `\`${message.guild.ownerId}\``, inline: true },
            { name: "🆔 ID du Serveur", value: `\`${message.guild.id}\``, inline: true }
        )
        .setFooter({ text: "BloumeChat Bot Example" })
        .setTimestamp();

    if (message.guild.icon) {
        // En BloumeChat, l'icon est mis en author iconUrl ou directement géré, utilisons l'author pour le logo
        embed.setAuthor({ name: message.guild.name, iconUrl: message.guild.icon });
    }

    await message.reply("", [embed]);
};
