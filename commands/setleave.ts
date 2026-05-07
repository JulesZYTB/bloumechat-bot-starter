import { Command } from "../types";
import { SettingsManager } from "../util/settings";

export const command: Command = {
    name: "setleave",
    description: "Définit le salon de départ actuel.",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ Cette commande ne peut être utilisée que sur un serveur.");

        SettingsManager.set(message.guild.id, { leaveChannelId: message.channel.id });

        await message.reply(`✅ Salon de départ défini sur <#${message.channel.id}>.`);
    }
};
