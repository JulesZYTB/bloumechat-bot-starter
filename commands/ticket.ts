import { Message, EmbedBuilder, PermissionFlags } from "bloumechat";

export const execute = async (message: Message) => {
    try {
        if (!message.guild) {
            return message.reply("Cette commande ne peut être utilisée que sur un serveur.");
        }

        // Fetch existing categories
        const categories = await message.guild.fetchCategories();

        let ticketsCategory = categories.find((c: any) => c.name.toLowerCase() === "tickets");

        // If category doesn't exist, create it
        if (!ticketsCategory) {
            ticketsCategory = await message.guild.createCategory("Tickets");
        }

        const channelName = `ticket-${message.author.username.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

        // Create the private channel under the established category
        const ticketChannel = await message.guild.createChannel({
            name: channelName,
            type: "TEXT",
            categoryId: ticketsCategory.id,
            isPrivate: true, // Denies @everyone VIEW_CHANNELS by default
            permissionOverwrites: [
                {
                    id: message.author.id,
                    type: "MEMBER",
                    allow: PermissionFlags.VIEW_CHANNELS | PermissionFlags.SEND_MESSAGES,
                    deny: 0n
                }
            ]
        });

        // Inform the user
        await message.reply(`✅ Ton ticket a été créé avec succès : <#${ticketChannel.id}>`);

        // Create a welcome embed in the new ticket channel
        const embed = new EmbedBuilder()
            .setTitle("🎟️ Support Ticket")
            .setDescription(`Bienvenue dans ton ticket, <@${message.author.id}>.\nUn administrateur va te prendre en charge rapidement.`)
            .setColor("#00AAFF")
            .setFooter({ text: "Utilise !close pour fermer ce ticket (si la commande est développée)" })
            .setTimestamp();

        await ticketChannel.send(`<@${message.author.id}>`, [embed]);

    } catch (e: any) {
        console.error("Error creating ticket:", e);
        await message.reply("❌ Une erreur est survenue lors de la création de votre ticket. Vérifiez que je possède la permission MANAGE_CHANNELS.");
    }
};
