import { Command } from "../types";
import { EmbedBuilder } from "bloumechat";

export const command: Command = {
    name: "warn",
    description: "Avertit un utilisateur pour une infraction.",
    async execute(client, message, args) {
        if (!message.guild) return message.reply("❌ Cette commande ne peut être utilisée que sur un serveur.");

        const targetId = args[0];
        const reason = args.slice(1).join(" ") || "Aucune raison spécifiée";

        if (!targetId) {
            return message.reply("❌ Usage: `!warn [userPublicId] [raison]`");
        }

        try {
            // Dans un vrai bot, on stockerait ça en DB. 
            // Ici on simule l'action avec un embed premium.
            
            const embed = new EmbedBuilder()
                .setTitle("⚠️ Avertissement de Modération")
                .setDescription(`Un utilisateur a été averti sur le serveur **${message.guild.name}**.`)
                .setColor("#FFA500")
                .addFields(
                    { name: "👤 Utilisateur Cible", value: `<@${targetId}> (\`${targetId}\`)`, inline: true },
                    { name: "🛡️ Modérateur", value: `<@${message.author.id}>`, inline: true },
                    { name: "📝 Raison", value: reason, inline: false }
                )
                .setThumbnail("https://cdn-icons-png.flaticon.com/512/179/179386.png")
                .setFooter({ text: "BloumeChat Safety System" })
                .setTimestamp();

            await message.channel.send("", [embed]);
            
            // On tente d'envoyer un MP à l'utilisateur (si l'API le permet via le client)
            // Pour l'exemple, on se contente du log public.
            
            await message.reply(`✅ L'utilisateur <@${targetId}> a reçu un avertissement.`);
            
        } catch (e: any) {
            await message.reply(`❌ Erreur lors de l'avertissement : ${e.message}`);
        }
    }
};
