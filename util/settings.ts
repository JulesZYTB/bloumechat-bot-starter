import fs from "fs";
import path from "path";

const SETTINGS_FILE = path.join(__dirname, "../../settings.json");

interface ServerSettings {
    welcomeChannelId?: string;
    leaveChannelId?: string;
}

interface SettingsStore {
    [serverId: string]: ServerSettings;
}

export class SettingsManager {
    private static load(): SettingsStore {
        if (!fs.existsSync(SETTINGS_FILE)) {
            return {};
        }
        try {
            return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8"));
        } catch (e) {
            console.error("Failed to load settings:", e);
            return {};
        }
    }

    private static save(settings: SettingsStore) {
        try {
            fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 4));
        } catch (e) {
            console.error("Failed to save settings:", e);
        }
    }

    static get(serverId: string): ServerSettings {
        const settings = this.load();
        return settings[serverId] || {};
    }

    static set(serverId: string, newSettings: Partial<ServerSettings>) {
        const settings = this.load();
        settings[serverId] = { ...(settings[serverId] || {}), ...newSettings };
        this.save(settings);
    }
}
