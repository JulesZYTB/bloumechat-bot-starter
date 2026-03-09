import { Command } from "../types";

/**
 * Command to run a live message edit counter.
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "counter",
    description: "Runs a live message edit counter.",
    async execute(client, message, args) {
        console.log("🔢 Starting live counter...");
        const counterMsg = await message.channel.send("Live Counter: 0");

        let count = 0;
        const interval = setInterval(async () => {
            count++;
            console.log(`🔢 Incremented: ${count}`);

            try {
                await counterMsg.edit(`Live Counter: ${count}`);
                if (count >= 10) {
                    clearInterval(interval);
                    console.log("🔢 Counter finished.");
                    await counterMsg.edit("Live Counter: Finished! ✅");
                }
            } catch (error: any) {
                clearInterval(interval);
                console.error("❌ Counter failed:", error);
                if (error.message?.includes("403")) {
                    await message.reply("❌ Counter stopped: Missing Permissions (403 Forbidden).");
                }
            }
        }, 1000);
    }
};
