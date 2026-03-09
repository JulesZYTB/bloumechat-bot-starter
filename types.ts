import { Message } from "../lib/sdk/structures/Message";
import { BloumeChat } from "../lib/sdk/bloumechat";

export interface Command {
    name: string;
    description: string;
    execute: (client: BloumeChat, message: Message, args: string[]) => Promise<any> | any;
}
