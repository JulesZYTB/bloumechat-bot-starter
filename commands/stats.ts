import { Command } from "../types";

export const command: Command = {
    name: "stats",
    description: "Replies with the bot's current statistics.",
    async execute(client, message, args) {
        const statsMsg = `📊 **Bot Stats**\nServers: ${client.guilds.cache.size}\nStatus: ${client.user?.status}\nLatency: ${client.getSocket()?.connected ? "Stable" : "Unstable"}`;
        await message.channel.send(statsMsg);
    }
};
