import { Message, EmbedBuilder } from "bloumechat";

export const execute = async (message: Message, args: string[]) => {
    const suggestion = args.join(" ");

    if (!suggestion) {
        return message.reply("Veuillez fournir une idée pour votre suggestion. Exemple : `!suggest Mettre un mode sombre`");
    }

    // Delete the original command message
    try {
        await message.delete();
    } catch (e) {
        // Might fail if the bot lacks MANAGE_MESSAGES permission
        console.warn("Failed to delete the suggestion command message.");
    }

    const embed = new EmbedBuilder()
        .setTitle("💡 Nouvelle Suggestion")
        .setDescription(suggestion)
        .setColor("#FFD700") // Gold
        .setAuthor({
            name: message.author.username,
            iconUrl: message.author.avatar || "https://bloumechat.com/logo.png"
        })
        .setFooter({ text: "Votez avec 👍 ou 👎 ci-dessous !" })
        .setTimestamp();

    // Send the beautiful embed
    const suggestionMsg = await message.channel.send("", [embed]);

    // Automatically add reaction options
    if (suggestionMsg) {
        try {
            await suggestionMsg.react("👍");
            await suggestionMsg.react("👎");
        } catch (e) {
            console.warn("Failed to add reactions to the suggestion:", e);
        }
    }
};
