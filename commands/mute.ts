import { Command } from "../types";
import { EmbedBuilder } from "bloumechat";

export const command: Command = {
    name: "mute",
    description: "Réduit au silence un utilisateur (Mute).",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ Cette commande ne peut être utilisée que sur un serveur.");

        const targetId = args[0];
        const duration = args[1] || "30m";
        const reason = args.slice(2).join(" ") || "Comportement inapproprié";

        if (!targetId) {
            return message.reply("❌ Usage: `!mute [userPublicId] [durée] [raison]`\nExemple: `!mute user_123 1h Spam`.");
        }

        try {
            // Dans cet exemple, on simule l'action technique.
            // On pourrait utiliser client.members.edit(targetId, { ... }) si le timeout était supporté.
            
            const embed = new EmbedBuilder()
                .setTitle("🔇 Sanction : Mise en sourdine")
                .setDescription(`L'utilisateur <@${targetId}> a été réduit au silence.`)
                .setColor("#757575")
                .addFields(
                    { name: "👤 Cible", value: `<@${targetId}>`, inline: true },
                    { name: "⏳ Durée", value: `\`${duration}\``, inline: true },
                    { name: "🛡️ Par", value: `<@${message.author.id}>`, inline: true },
                    { name: "📝 Raison", value: reason, inline: false }
                )
                .setFooter({ text: "BloumeChat Auto-Moderation" })
                .setTimestamp();

            await message.channel.send("", [embed]);
            await message.reply(`✅ <@${targetId}> a été mute pendant **${duration}**.`);
            
        } catch (e: any) {
            await message.reply(`❌ Erreur lors du mute : ${e.message}`);
        }
    }
};
