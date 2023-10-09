import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption } from 'discord.js';
import { ADD_TO_SERVER_URL, ClientData } from '../../resources/structures';
import { translate } from 'free-translate';
import { Locale } from 'free-translate/dist/types/locales';
import chalk from 'chalk';

export default {
	commandName: 'invite',
	cooldown: 15,
	guilds: null,
	data: new SlashCommandBuilder()
		.setNSFW(false)
		.setDMPermission(true)
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setName('invite')
		.setDescription('Adds IBX Translator🌐 to your server!')
		.setDescriptionLocalizations({
			'en-GB': 'Adds IBX Translator🌐 to your server!',
			'en-US': 'Adds IBX Translator🌐 to your server!',
			de: 'Fügt IBX Translator🌐 zu Ihrem Server hinzu!',
			ru: 'Добавляет IBX Translator🌐 на ваш сервер!',
			"es-ES": '¡Agrega a IBX Translator🌐 a tu servidor!'
		}),
		
	async execute(client: ClientData, interaction: Interaction) {

		if (!interaction.isChatInputCommand()) return;

		await interaction.reply({ content: `Invite [IBX Translator🌐 to your server!](${ADD_TO_SERVER_URL})`, ephemeral: true });
	},
};