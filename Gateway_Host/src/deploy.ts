const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const { config } = require('dotenv');
config();

import chalk from 'chalk';
import { SlashCommandBuilder } from 'discord.js';

const clientId = process.env.CLIENT_ID;
const token = process.env.DISCORD_BOT_TOKEN;

const rest = new REST({ version: '9' }).setToken(token);

/*
rest.get(Routes.applicationCommands(clientId))
    .then((data: any) => {
        const promises = [];
        for (const command of data) {
			console.log(chalk.red(`Deleting command ${command.name}`));

            const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all( promises);
    });
*/

const commands = [];

// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const m_command = require(filePath);
		const command = m_command.default;

		console.log(JSON.stringify(command.data, null, 2));

		if ('data' in command && 'execute' in command) {
			console.log((command.data as SlashCommandBuilder));
			commands.push((command.data as SlashCommandBuilder).toJSON());
			
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

}

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();