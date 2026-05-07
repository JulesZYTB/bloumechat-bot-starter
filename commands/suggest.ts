import { Command } from "../types";
import { EmbedBuilder } from "bloumechat";

export const command: Command = {
    name: "suggest",
    description: "Envoie une suggestion pour le serveur.",
    async execute(client, message, args) {
        const suggestion = args.join(" ");

        if (!suggestion) {
            return message.reply("❌ Veuillez fournir une idée pour votre suggestion. Exemple : `!suggest Ajouter un salon musique`.");
        }

        // Delete the original command message
        try {
            await message.delete();
        } catch (e) {
            // Might fail if the bot lacks MANAGE_MESSAGES permission
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
    }
};
