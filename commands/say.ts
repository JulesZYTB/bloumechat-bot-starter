import { Message } from "bloumechat";

export const execute = async (message: Message, args: string[]) => {
    const text = args.join(" ");

    if (!text) {
        return message.reply("Veuillez indiquer le texte que je dois répéter. Exemple : `!say Bonjour tout le monde`");
    }

    // On supprime le message d'origine si on a les droits
    try {
        await message.delete();
    } catch (e) {
        // Ignore si on a pas la permission
    }

    // Le bot envoie le message texte
    await message.channel.send(text);
};
