import { EmbedBuilder } from "bloumechat";
import { Command } from "../types";

/**
 * Command to send an embed message.
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "embed",
    description: "Sends a stunning Embed element.",
    async execute(client, message, args) {
        console.log("➡️ Sending an embed message");
        const embed = new EmbedBuilder()
            .setTitle("✨ BloumeChat SDK Embed")
            .setDescription("This is a demonstration of the new `EmbedBuilder` structure replicating Discord's functionality!")
            .setColor("#5865F2")
            // @ts-ignore
            .setAuthor({ name: client.user?.username || "Bot", iconUrl: client.user?.image || undefined })
            .addFields({ name: "Version", value: "1.0.0", inline: true })
            .addFields({ name: "Ping", value: "Available", inline: true })
            .setFooter({ text: "Powered by BloumeChat" })
            .setTimestamp();

        await message.channel.send({ content: "Here is your embed:", embeds: [embed] });
    }
};
