import path from "path";
import fs from "fs/promises";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadCommandFiles(commandsPath) {
    const commandFiles = (await fs.readdir(commandsPath)).filter(file => file.endsWith(".js"));
    return commandFiles.map(file => path.join(commandsPath, file));
}

async function loadCommand(filePath) {
    try {
        const moduleUrl = pathToFileURL(filePath).href;
        const commandModule = await import(moduleUrl);
        const command = commandModule.default ? commandModule.default : commandModule;
        if (!("data" in command && "execute" in command)) {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            return;
        }
        return command;
    } catch (error) {
        console.log(`[ERROR] Failed to load command at ${filePath}:`, error);
    }
}

async function loadCommands() {
    const registryPath = path.join(__dirname, "registry");
    const commandFiles = await loadCommandFiles(registryPath);
    const commands = new Map();

    // Iterate through all files in the ./registry directory to load all commands.
    for (const filePath of commandFiles) {
        const command = await loadCommand(filePath);
        
        if (command) {
            commands.set(command.data.name, command);
        }
    }
    return commands;
}

let commandsCache; // Someone pls explain I forgot why I did this.

export async function getCommands() {
    if (!commandsCache) { // I forgot what this was for...
        commandsCache = await loadCommands();
    }
    return commandsCache;
}
