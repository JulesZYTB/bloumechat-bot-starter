import { Command } from "../types";

/**
 * Test command to verify bot functionality.
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "test",
    description: "Runs a comprehensive functional test.",
    async execute(client, message, args) {
        console.log("🛠️ Running comprehensive tests...");

        try {
            await message.react("✅");
            await message.channel.sendTyping();

            const testMsg = await message.channel.send("Testing message editing... (Waiting 2s)");

            await new Promise(resolve => setTimeout(resolve, 2000));

            await testMsg.edit("Message Edited Successfully! ✨");
            await testMsg.pin();
            console.log("📌 Message pinned.");

        } catch (error: any) {
            console.error("❌ Test failed:", error);
            if (error.message?.includes("403")) {
                await message.reply("❌ Test failed: I lack the necessary permissions (403 Forbidden). Make sure I have permissions like `MANAGE_MESSAGES`.");
            } else {
                await message.reply(`❌ Error executing integration test: ${error.message}`);
            }
        }
    }
};
