import { BloumeChat } from "bloumechat";

/**
 * Event handler for the 'ready' event.
 * This event is triggered when the bot has successfully connected to BloumeChat.
 *
 * @export
 * @default
 * @type {object}
 * @property {string} name - The name of the event.
 * @property {boolean} once - Whether the event should only be executed once.
 * @property {function(BloumeChat): Promise<void>} execute - The function to execute when the event is triggered.
 */
export default {
    name: "ready",
    once: true,
    async execute(client: BloumeChat) {
        console.log("-----------------------------------------");
        console.log(`🚀 Bot connected as: ${client.user?.username}#${client.user?.tag}`);
        console.log(`🌐 Total Servers: ${client.guilds.cache.size}`);
        console.log("-----------------------------------------");

        console.log("⚙️ Setting status to 'dnd' (Do Not Disturb)...");
        await client.setStatus("dnd");
    }
};
