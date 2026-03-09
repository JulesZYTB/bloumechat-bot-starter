import { Message, BloumeChat } from "bloumechat";

/**
 * Interface pour les commandes du bot
 *
 * @export
 * @interface Command
 */
export interface Command {
    name: string;
    description: string;
    execute: (client: BloumeChat, message: Message, args: string[]) => Promise<any> | any;
}
