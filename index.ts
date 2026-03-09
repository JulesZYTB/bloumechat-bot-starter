import { BloumeChat } from "bloumechat";
import { Command } from "./types";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config();

/**
 * BloumeChat.js Test Bot Example - Modular Configuration
 * 
 * Token: BC.MjgxODMyNjkzODI0NDg4NTY4.MTc3MTI2MTM1MDQwNw.b5hhc07gcyi4wmm3l13l873u
 */

const client = new BloumeChat();
export const commands = new Map<string, Command>();

// Load Commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { command } = require(filePath);
    if ("name" in command && "execute" in command) {
        commands.set(command.name, command);
    } else {
        console.warn(`[WARNING] The command at ${filePath} is missing a required "name" or "execute" property.`);
    }
}

// Load Events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath).default;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// Handling SDK Engine Errors globally
client.on("error", (error: any) => {
    // Suppress connection errors during retries
    const isTransportError = error?.type === 'TransportError' || error?.message === 'websocket error';
    const isConnRefused = error?.code === 'ECONNREFUSED' || error?.description?.code === 'ECONNREFUSED';

    if (isTransportError || isConnRefused) {
        return;
    }
    console.error("🧨 SDK Error:", error);
});

// Login
const token = process.env.BLOUMECHAT_TOKEN;
if (!token) {
    console.error("❌ ERREUR: Aucun token BloumeChat fourni. Veuillez configurer BLOUMECHAT_TOKEN dans votre fichier .env");
    process.exit(1);
}

console.log("🔌 Connecting to BloumeChat...");
client.login(token);
