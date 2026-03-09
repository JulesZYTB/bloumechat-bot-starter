import { Message, EmbedBuilder } from "bloumechat";

export const execute = async (message: Message) => {
    const avatarUrl = message.author.avatar || "https://bloumechat.com/logo.png";

    const embed = new EmbedBuilder()
        .setTitle(`🖼️ Avatar de ${message.author.username}`)
        .setColor("#E91E63")
        .setAuthor({ name: message.author.username, iconUrl: avatarUrl })
        .setDescription(`[Lien direct vers l'avatar](${avatarUrl})`)
        .setFooter({ text: "BloumeChat Bot Example" })
        .setTimestamp();

    await message.reply("", [embed]);
};
