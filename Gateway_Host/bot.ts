// Import necessary modules and dependencies
require('dotenv').config();
import * as fs from 'fs';
import * as path from 'path';
import { Client, GatewayIntentBits } from 'discord.js';
import { ClientData } from './structures/classes';
import { Command } from './structures/classes';
import { ICommand, ICooldown } from './structures/interfaces';

// Initialize arrays to store commands and cooldowns
const commands: Command[] = [];
const cooldowns: ICooldown[] = [];

// Create a ClientData instance to store client-related data
const client = new ClientData(new Client({ intents: [GatewayIntentBits.Guilds] }), commands, cooldowns);

// Define the path to the directory containing command files
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Loop through command folders
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Loop through command files in each folder
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Check if the required properties exist in the command object
        if ('cooldown' in command && 'data' in command && 'execute' in command && 'guilds' in command) {
            // Create a new Command instance and add it to the commands array
            const cmd = new Command(command.cooldown, command.data, command.execute, command.guilds);
            client.commands.push(cmd);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Define the path to the directory containing event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Loop through event files
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    // Attach event handlers to the client
    if (event.once) {
        client.discordClient.once(event.name, (...args) => event.execute(...args));
    } else {
        client.discordClient.on(event.name, (...args) => event.execute(...args));
    }
}

// Log in to Discord with your bot's token
client.discordClient.login(process.env.DISCORD_BOT_TOKEN);