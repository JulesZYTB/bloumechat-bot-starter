import { Command } from "../types";
import { SettingsManager } from "../util/settings";

export const command: Command = {
    name: "setwelcome",
    description: "Définit le salon de bienvenue actuel.",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ Cette commande ne peut être utilisée que sur un serveur.");

        // Check for admin permissions (simple check for now)
        if (message.guild.ownerId !== message.author.id) {
            // Check if admin permission exists in SDK util if needed, but owner is safe
            // return message.reply("❌ Vous devez être le propriétaire pour configurer le bot.");
        }

        SettingsManager.set(message.guild.id, { welcomeChannelId: message.channel.id });

        await message.reply(`✅ Salon de bienvenue défini sur <#${message.channel.id}>.`);
    }
};
