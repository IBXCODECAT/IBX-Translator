// Import necessary modules and dependencies
require('dotenv').config();
import fs from 'fs';
import path from 'path';

import { Client, GatewayIntentBits } from 'discord.js';
import { ClientData, GLOBAL_COMMONJS_FILE_EXTENSION, InteractionComponent } from './resources/structures';
import { Cooldown, Command } from './resources/structures';
import chalk from 'chalk';
import i18next from 'i18next';
import I18NextFSBackend from 'i18next-fs-backend';

// Initialize i18next
i18next
    .use(I18NextFSBackend)
    .init({
        fallbackLng: ['en', 'en-US', 'en-GB', 'ru', 'de', 'es-ES'], // The default language to use
        //debug: true,
        initImmediate: false, // Set to false to prevent calling the callback function before the translation data is loaded
        backend: {
            loadPath: `${__dirname}\\locales\\{{lng}}.json`, // Path to your translation files
        },
    });

// Initialize arrays to store commands, cooldowns, and components
const commands: Command[] = [];
const cooldowns: Cooldown[] = [];
const components: InteractionComponent[] = [];

// Create a ClientData instance to store client-related data
const client = new ClientData(new Client({ intents: [GatewayIntentBits.Guilds] }), commands, components, cooldowns);

// Define the path to the directory containing command interaction files (includes subdirectories)
const commandsDirectoryPath = path.join(__dirname, 'commands');
const commandsDirectory = fs.readdirSync(commandsDirectoryPath);

//Define the path to the directory containing component interaction files (includes subdirectories)
const componentsDirectoryPath = path.join(__dirname, 'components');
const componentsDirectory = fs.readdirSync(componentsDirectoryPath);

// Define the path to the directory containing event files (does not include subdirectories)
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith(GLOBAL_COMMONJS_FILE_EXTENSION));

// Loop through command folders
for (const directory of commandsDirectory) {
    const commandsPath = path.join(commandsDirectoryPath, directory);
    const commandFiles: string[] = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith(GLOBAL_COMMONJS_FILE_EXTENSION));

    console.log(chalk.cyanBright(`Found ${commandFiles.length} command(s) in directory ${directory}...`));

    // Loop through command files in each folder
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const m_command = require(filePath);
        const command = m_command.default;

        console.log(command);
        
        // Check if the required properties exist in the command object
        if ('cooldown' in command && 'data' in command && 'execute' in command && 'guilds' in command) {
            // Create a new Command instance and add it to the commands array
            const cmd = new Command(command.cooldown, command.commandName, command.data, command.execute, command.guilds);
            client.commands.push(cmd);
        } else {
            console.log(chalk.yellowBright(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`));
        }
    }
}

for(const directory of componentsDirectory) {
    const componentsPath = path.join(componentsDirectoryPath, directory);
    const componentFiles: string[] = fs.readdirSync(componentsPath).filter((file: string) => file.endsWith(GLOBAL_COMMONJS_FILE_EXTENSION));

    console.log(chalk.cyanBright(`Found ${componentFiles.length} component(s) in directory ${directory}...`));

    for(const file of componentFiles) {
        const filePath = path.join(componentsPath, file);
        const m_component = require(filePath);
        const component = m_component.default;

        console.log(component);

        if('componentId' in component) {
            client.components.push(component);
        } else {
            console.log(chalk.yellowBright(`[WARNING] The component at ${filePath} is missing a required "componentId" property.`));
        }
    }
}

console.log(chalk.cyanBright(`Found ${eventFiles.length} event(s)...`));

// Loop through event files
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    console.log(event.default);

    // Attach event handlers to the client
    if (event.once) {
        client.discordClient.once(event.default.name, (...args) => event.default.execute(client, ...args));
    } else {
        client.discordClient.on(event.default.name, (...args) => event.default.execute(client, ...args));
    }
}

// Log in to Discord with your bot's token
client.discordClient.login(process.env.DISCORD_BOT_TOKEN);