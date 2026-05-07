import { BloumeChat, EmbedBuilder } from "bloumechat";
import { SettingsManager } from "../util/settings";

export default {
    name: "guildMemberAdd",
    async execute(client: BloumeChat, data: any) {
        const serverId = data.serverPublicId || data.serverId;
        const settings = SettingsManager.get(serverId);

        if (!settings.welcomeChannelId) return;

        try {
            const channel = await client.channels.fetch(settings.welcomeChannelId);
            if (!channel) return;

            const user = data.user || data;
            const username = user.username || "Nouvel utilisateur";
            const avatarUrl = user.avatar || "https://bloumechat.com/logo.png";
            const guild = client.guilds.cache.get(serverId);

            const embed = new EmbedBuilder()
                .setTitle(`👋 Bienvenue sur ${guild?.name || "le serveur"} !`)
                .setDescription(`Heureux de te voir parmi nous, **${username}** !`)
                .setColor("#2ECC71")
                .setThumbnail(avatarUrl)
                .addFields(
                    { name: "👤 Utilisateur", value: `<@${user.publicId || user.id}>`, inline: true },
                    { name: "🔢 Total Membres", value: `${guild?.memberCount || "???"}`, inline: true }
                )
                .setImage("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y2bmZ4ZzB4bmZ4ZzB4bmZ4ZzB4bmZ4ZzB4bmZ4ZzB4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/vFKqnCdLPNOKc/giphy.gif")
                .setFooter({ text: "BloumeChat Welcome System" })
                .setTimestamp();

            await (channel as any).send(`<@${user.publicId || user.id}>`, [embed]);
            console.log(`[Welcome] Greeted ${username} in server ${serverId}`);
        } catch (e) {
            console.error("[Welcome Error]", e);
        }
    }
};
