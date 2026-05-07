import { BloumeChat, EmbedBuilder } from "bloumechat";
import { SettingsManager } from "../util/settings";

export default {
    name: "guildMemberRemove",
    async execute(client: BloumeChat, data: any) {
        const serverId = data.serverPublicId || data.serverId;
        const settings = SettingsManager.get(serverId);

        if (!settings.leaveChannelId) return;

        try {
            const channel = await client.channels.fetch(settings.leaveChannelId);
            if (!channel) return;

            const user = data.user || data;
            const username = user.username || "Un utilisateur";

            const embed = new EmbedBuilder()
                .setTitle("💔 Un membre nous a quitté")
                .setDescription(`Bonne route à **${username}**... Tu vas nous manquer !`)
                .setColor("#E74C3C")
                .setFooter({ text: "BloumeChat Leave Log" })
                .setTimestamp();

            await (channel as any).send("", [embed]);
            console.log(`[Leave] Logged exit for ${username} in server ${serverId}`);
        } catch (e) {
            console.error("[Leave Error]", e);
        }
    }
};
