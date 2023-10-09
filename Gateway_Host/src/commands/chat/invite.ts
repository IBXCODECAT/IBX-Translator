import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption } from 'discord.js';
import { ADD_TO_SERVER_URL, ClientData } from '../../resources/structures';
import i18next from 'i18next';

const strings = {
	commandName: 'cmd.slash.invite.name',
	commandDescription: 'cmd.slash.invite.description'
};

export default {
	commandName: 'invite',
	cooldown: 15,
	guilds: null,
	data: new SlashCommandBuilder()
		.setNSFW(false)
		.setDMPermission(true)
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setName(i18next.t(strings.commandName, { lng: 'en' }))
		.setDescription(i18next.t(strings.commandDescription, { lng: 'en' }))
		.setDescriptionLocalizations({
			'en-GB': i18next.t(strings.commandDescription, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.commandDescription, { lng: 'en-US' }),
			'de': i18next.t(strings.commandDescription, { lng: 'de' }),
			'ru': i18next.t(strings.commandDescription, { lng: 'ru' }),
			"es-ES": i18next.t(strings.commandDescription, { lng: 'es-ES' })
		}),
		
	async execute(client: ClientData, interaction: Interaction) {

		if (!interaction.isChatInputCommand()) return;

		await interaction.reply({ content: `Invite [IBX Translator🌐 to your server!](${ADD_TO_SERVER_URL})`, ephemeral: true });
	},
};