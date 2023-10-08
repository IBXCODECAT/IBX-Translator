import { Events, Collection, Interaction } from 'discord.js';
import { ClientData, Command } from '../structures';

module.exports = {
	name: Events.InteractionCreate,
	async execute(client: ClientData, interaction: Interaction) {

		const { cooldowns } = client;

		if(interaction.isChatInputCommand())
		{
			let command: any;
			let commandResolved: boolean = false;
			
			client.commands.forEach((cmd) => {
				if(cmd.data.commandName === interaction.commandName)
				{
					command = cmd;
					commandResolved = true;
				}
			});

			if(command !instanceof Command) return;
			
			try {
				await command.execute(client, interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}

		}


		


		/*
		if (!cooldowns.has(command.data.commandName)) {
			cooldowns.set(command.data.commandName, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.commandName);
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.commandName}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
		*/
		
	},
};