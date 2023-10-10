import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption } from 'discord.js';
import { ADD_TO_SERVER_URL, ClientData } from '../../resources/structures';
import i18next from 'i18next';

const strings = {
	commandName: 'cmd.slash.invite.title',
	commandDescription: 'cmd.slash.invite.description'
};

const DISCORD_REF_NAME = 'invite';

export default {
	commandName: DISCORD_REF_NAME,
	cooldown: 15,
	guilds: null,
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setDMPermission(true)
		.setNSFW(false)
		.setName(DISCORD_REF_NAME)
		.setNameLocalizations({
			'en-GB': i18next.t(strings.commandName, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.commandName, { lng: 'en-US' }),
			'ru': i18next.t(strings.commandName, { lng: 'ru' }),
			'de': i18next.t(strings.commandName, { lng: 'de' }),
			"es-ES": i18next.t(strings.commandName, { lng: 'es-ES' })
		})
		.setDescription(i18next.t(strings.commandDescription, { lng: 'en' }))
		.setDescriptionLocalizations({
			'en-GB': i18next.t(strings.commandDescription, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.commandDescription, { lng: 'en-US' }),
			'ru': i18next.t(strings.commandDescription, { lng: 'ru' }),
			'de': i18next.t(strings.commandDescription, { lng: 'de' }),
			"es-ES": i18next.t(strings.commandDescription, { lng: 'es-ES' })
		}),
		
	async execute(client: ClientData, interaction: Interaction) {

		if (!interaction.isChatInputCommand()) return;

		await interaction.reply({ content: `Invite [IBX Translator🌐 to your server!](${ADD_TO_SERVER_URL})`, ephemeral: true });
	},
};