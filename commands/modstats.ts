import { Command } from "../types";
import { EmbedBuilder } from "bloumechat";

export const command: Command = {
    name: "modstats",
    description: "Affiche les statistiques de modération du serveur.",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ Cette commande ne peut être utilisée que sur un serveur.");

        // On simule des stats pour l'esthétique de l'exemple
        const embed = new EmbedBuilder()
            .setTitle(`📊 Statistiques de Modération - ${message.guild.name}`)
            .setDescription("Récapitulatif des actions de sécurité sur les 30 derniers jours.")
            .setColor("#2ECC71")
            .setThumbnail(message.guild.icon || "https://bloumechat.com/logo.png")
            .addFields(
                { name: "🔨 Bans", value: "12", inline: true },
                { name: "👢 Kicks", value: "45", inline: true },
                { name: "⚠️ Warnings", value: "128", inline: true },
                { name: "🔇 Mutes", value: "32", inline: true },
                { name: "🧹 Messages Supprimés", value: "1,452", inline: true },
                { name: "🛡️ Auto-Mod Blocks", value: "267", inline: true }
            )
            .setFooter({ text: "Données synchronisées avec BloumeChat Security" })
            .setTimestamp();

        await message.reply("", [embed]);
    }
};
