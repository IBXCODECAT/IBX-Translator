import { Events, Interaction } from 'discord.js';
import { ClientData, Command, InteractionComponent } from '../resources/structures';

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(client: ClientData, interaction: Interaction) {

		const { cooldowns } = client;

		if (interaction.isCommand()) {
			console.log(interaction.id);

			let command: Command;
			let commandResolved: boolean = false;

			client.commands.forEach((cmd) => {

				if (cmd.commandName === interaction.commandName) {
					command = cmd as Command;
					commandResolved = true;
				}
			});

			if (!commandResolved) return;

			console.log('Command resolved!');

			try {
				await command!.execute(client, interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}

		if(interaction.isMessageComponent()) {
			console.log(interaction.customId);

			let componentInteraction: InteractionComponent;
			let componentInteractionResolved: boolean = false;

			client.components.forEach((component) => {

				if (component.componentId === interaction.customId) {
					componentInteraction = component as InteractionComponent;
					componentInteractionResolved = true;
				}
			});

			if(!componentInteractionResolved) return;

			console.log('Component interaction resolved!');

			try {
				await componentInteraction!.execute(client, interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this component interaction!', ephemeral: true });
			}
		}
	},
};