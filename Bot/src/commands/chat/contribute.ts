import { SlashCommandBuilder, Interaction, PermissionFlagsBits } from 'discord.js';
import { ADD_TO_SERVER_URL, ClientData, GITHUB_PAGE_URL } from '../../resources/structures';
import i18next from 'i18next';

import { strings } from '../../locales/locales';

const DISCORD_REF_NAME = 'contribute';

export default {
	commandName: DISCORD_REF_NAME,
	cooldown: 5,
	guilds: null,
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setDMPermission(true)
		.setNSFW(false)
		.setName(DISCORD_REF_NAME)
		.setNameLocalizations({
			'en-GB': i18next.t(strings.contributeCommandName, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.contributeCommandName, { lng: 'en-US' }),
			'ru': i18next.t(strings.contributeCommandName, { lng: 'ru' }),
			'de': i18next.t(strings.contributeCommandName, { lng: 'de' }),
			"es-ES": i18next.t(strings.contributeCommandName, { lng: 'es-ES' })
		})
		.setDescription(i18next.t(strings.contributeCommandDescription, { lng: 'en' }))
		.setDescriptionLocalizations({
			'en-GB': i18next.t(strings.contributeCommandDescription, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.contributeCommandDescription, { lng: 'en-US' }),
			'ru': i18next.t(strings.contributeCommandDescription, { lng: 'ru' }),
			'de': i18next.t(strings.contributeCommandDescription, { lng: 'de' }),
			"es-ES": i18next.t(strings.contributeCommandDescription, { lng: 'es-ES' })
		}),
		
	async execute(client: ClientData, interaction: Interaction) {

		if (!interaction.isChatInputCommand()) return;

		await interaction.reply({ content: `${GITHUB_PAGE_URL}`, ephemeral: true });
	},
};