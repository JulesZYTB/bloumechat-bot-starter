import { Command } from "../types";

/**
 * Command to create a poll and wait for reactions.
 * @param client - The BloumeChat client instance.
 * @param message - The message object.
 * @param args - The arguments passed to the command.
 */
export const command: Command = {
    name: "poll",
    description: "Creates a yes/no poll and waits for reactions.",
    async execute(client, message, args) {
        const question = args.join(" ");
        if (!question) return message.reply("❌ Usage: `!poll [question]`");

        try {
            const pollMsg = await message.reply(`📊 **POLL:** ${question}`);
            await pollMsg.react("👍");
            await pollMsg.react("👎");

            await message.reply(`⏳ Poll started! Waiting 10 seconds for reactions...`);

            // Wait for reactions (or 10 seconds timeout)
            await pollMsg.awaitReactions({ time: 10000 });

            const upvotes = await pollMsg.fetchReactions("👍");
            const downvotes = await pollMsg.fetchReactions("👎");

            await message.reply(`📊 Results for "${question}":\n👍: ${upvotes.length}\n👎: ${downvotes.length}`);

            // Cleanup
            await pollMsg.clearReactions();
        } catch (e: any) {
            await message.reply(`❌ Error: ${e.message}`);
        }
    }
};
