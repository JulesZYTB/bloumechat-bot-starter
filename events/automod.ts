import { BloumeChat, Message, EmbedBuilder } from "bloumechat";

/**
 * Automod System
 * Scans messages for blacklisted words, link spam, etc.
 */
export default {
    name: "messageCreate",
    async execute(client: BloumeChat, message: Message) {
        // Ignore bots to prevent loops
        if (message.author.bot) return;

        const content = message.content.toLowerCase();
        
        // 1. Blacklisted words (Example list)
        const blacklist = ["scam", "hack", "nitro-free", "discord-gift", "insulte1", "insulte2"];
        const hasBlacklistedWord = blacklist.some(word => content.includes(word));

        // 2. Link filter (Prevent external ads)
        const hasLink = /(https?:\/\/[^\s]+)/g.test(content);
        
        // 3. Caps abuse (More than 70% caps and at least 10 chars)
        const capsCount = message.content.replace(/[^A-Z]/g, "").length;
        const isCapsAbuse = message.content.length > 10 && (capsCount / message.content.length) > 0.7;

        let violation = "";
        if (hasBlacklistedWord) violation = "Mot interdit détecté";
        else if (hasLink) violation = "Lien externe non autorisé";
        else if (isCapsAbuse) violation = "Abus de MAJUSCULES";

        if (violation) {
            try {
                // Delete the message
                await message.delete();

                // Send an AutoMod alert
                const embed = new EmbedBuilder()
                    .setTitle("🛡️ Auto-Modération")
                    .setDescription(`Le message de <@${message.author.id}> a été supprimé.`)
                    .setColor("#FF0000")
                    .addFields(
                        { name: "👤 Utilisateur", value: message.author.username, inline: true },
                        { name: "🚫 Raison", value: violation, inline: true }
                    )
                    .setFooter({ text: "Ce message s'auto-détruira dans 10 secondes." })
                    .setTimestamp();

                const warning = await message.channel.send("", [embed]);

                // Auto-delete the warning after 10 seconds to keep the chat clean
                if (warning) {
                    setTimeout(async () => {
                        try { await warning.delete(); } catch (e) {}
                    }, 10000);
                }

                console.log(`[AutoMod] Deleted message from ${message.author.username}: ${violation}`);
            } catch (e) {
                console.error("[AutoMod] Failed to delete message or send warning:", e);
            }
        }
    }
};
