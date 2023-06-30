//const language = require('./langOptions');
//const translate = require('google-translate-api');
//const speech = require('./messages');

require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

/*
client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // It can be a regular ! message. This says to not bother if it doesn't have a prefix, and
    // to not trigger if a bot gives a command.
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return; 
    }

    // Auto-translates the text into the command's language like !japanese, or !french
    if (language.some(ele => ele.name === command)) {
        if (args.length === 0) {
            message.reply(speech.BOT_FULLNAME_AUTO_ERROR);
        } else {
            let lang_to = language.filter(ele => ele.name===command)[0].abrv;
            let text = args.slice(0).join(' ');
            translate(text, {to: lang_to})
                .then(res => message.channel.send(res.text))
                .catch(err => message.channel.send(speech.BOT_TRANSLATION_ERROR + err));
        }
    }

    // Auto translates with abbreviation like !ko, !en, or !de
    if (language.some(ele => ele.abrv=== command)) {
        if (args.length === 0) {
            message.reply(speech.BOT_ABBR_AUTO_ERROR);
        } else {
            let lang_to = language.filter(ele => ele.abrv===command)[0].abrv;
            let text = args.slice(0).join(' ');
            translate(text, {to: lang_to})
                .then(res => message.channel.send(res.text))
                .catch(err => message.channel.send(speech.BOT_TRANSLATION_ERROR + err));
        }
    }

    // Specifies the text's language and translates it into a specific language
    if (command === "translate") {
        if (args.length < 3) {
            message.reply(speech.BOT_TRANS_SPECIFIC_ERROR);
        } else {
            let argFrom = args[0].toLowerCase();
            let argTo = args[1].toLowerCase();

            let lang_from = language.filter(ele => ele.name === argFrom)[0].abrv;
            let lang_to = language.filter(ele => ele.name=== argTo)[0].abrv;
            let text = args.slice(2).join(' ');

            translate(text, {from: lang_from, to: lang_to})
                .then(res => message.channel.send(res.text))
                .catch(err => console.log(speech.BOT_TRANSLATION_ERROR + err));
        }
    }

    if (command === "commands") {
        message.channel.send(speech.BOT_COMMANDS_HELP);
    }

})

client.login(process.env.BOT_TOKEN);
*/

// Log in to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);