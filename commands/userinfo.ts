import { Message, EmbedBuilder } from "bloumechat";

export const execute = async (message: Message, args: string[]) => {
    const embed = new EmbedBuilder()
        .setTitle(`👤 Infos de l'utilisateur : ${message.author.username}`)
        .setColor("#1ABC9C")
        .addFields(
            { name: "Nom d'utilisateur", value: message.author.username, inline: true },
            { name: "Tag", value: `#${message.author.tag}`, inline: true },
            { name: "ID", value: `\`${message.author.id}\``, inline: false },
            { name: "Bot ?", value: message.author.bot ? "🤖 Oui" : "👤 Non", inline: true },
            { name: "Statut Actuel", value: message.author.status, inline: true }
        )
        .setFooter({ text: "Demandé par " + message.author.username })
        .setTimestamp();

    if (message.author.avatar) {
        embed.setAuthor({ name: message.author.username, iconUrl: message.author.avatar });
    }

    await message.reply("", [embed]);
};
