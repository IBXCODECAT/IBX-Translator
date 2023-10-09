import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption } from 'discord.js';
import { ClientData } from '../../resources/structures';
import { translate } from 'free-translate';
import { Locale } from 'free-translate/dist/types/locales';
import chalk from 'chalk';

import i18next from 'i18next';

const strings = {
	commandName: 'cmd.slash.translate.name',
	commandDescription: 'cmd.slash.translate.description',
	contentFieldName: 'cmd.slash.translate.options.content.name',
	contentFieldDescription: 'cmd.slash.translate.options.content.description',
};


export default {
	cooldown: 15,
	guilds: null,
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setDMPermission(true)
		.setNSFW(false)

		.setName(i18next.t(strings.commandName, { lng: 'en' }))
		.setDescription(i18next.t(strings.commandDescription, { lng: 'en' }))
		.setDescriptionLocalizations({
			'en-GB': i18next.t(strings.commandDescription, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.commandDescription, { lng: 'en-US' }),
			'ru': i18next.t(strings.commandDescription, { lng: 'ru' }),
			'de': i18next.t(strings.commandDescription, { lng: 'de' }),
			"es-ES": i18next.t(strings.commandDescription, { lng: 'es-ES' })
		})
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName(i18next.t(strings.contentFieldName, { lng: 'en' }))
				.setDescription(i18next.t(strings.contentFieldDescription, { lng: 'en' }))
				.setRequired(true)
				.setNameLocalizations({
					'en-GB': i18next.t(strings.contentFieldName, { lng: 'en-GB' }),
					'en-US': i18next.t(strings.contentFieldName, { lng: 'en-US' }),
					'ru': i18next.t(strings.contentFieldName, { lng: 'ru' }),
					'de': i18next.t(strings.contentFieldName, { lng: 'de' }),
					"es-ES": i18next.t(strings.contentFieldName, { lng: 'es-ES' })
				}))
		.setDescriptionLocalizations({
			'en-GB': i18next.t(strings.contentFieldDescription, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.contentFieldDescription, { lng: 'en-US' }),
			'ru': i18next.t(strings.contentFieldDescription, { lng: 'ru' }),
			'de': i18next.t(strings.contentFieldDescription, { lng: 'de' }),
			"es-ES": i18next.t(strings.contentFieldDescription, { lng: 'es-ES' })
		})
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName(i18next.t('cmd.slash.translate.options.language.name', { lng: 'en' }))
				.setDescription(i18next.t('cmd.slash.translate.options.language.description', { lng: 'en' }))
				.setRequired(true)
				.setNameLocalizations({
					'en-GB': i18next.t('cmd.slash.translate.options.language.name', { lng: 'en-GB' }),
					'en-US': i18next.t('cmd.slash.translate.options.language.name', { lng: 'en-US' }),
					'ru': i18next.t('cmd.slash.translate.options.language.name', { lng: 'ru' }),
					'de': i18next.t('cmd.slash.translate.options.language.name', { lng: 'de' }),
					"es-ES": i18next.t('cmd.slash.translate.options.language.name', { lng: 'es-ES' })
				})
				.setDescriptionLocalizations({
					'en-GB': i18next.t('cmd.slash.translate.options.language.description', { lng: 'en-GB' }),
					'en-US': i18next.t('cmd.slash.translate.options.language.description', { lng: 'en-US' }),
					'ru': i18next.t('cmd.slash.translate.options.language.description', { lng: 'ru' }),
					'de': i18next.t('cmd.slash.translate.options.language.description', { lng: 'de' }),
					"es-ES": i18next.t('cmd.slash.translate.options.language.description', { lng: 'es-ES' })
				})
				.addChoices(
					{ name: 'Deutsch', value: 'de' },
					{ name: 'English (British)', value: 'en-GB' },
					{ name: 'English (United States)', value: 'en-US' },
					{ name: 'Español', value: 'es-ES' },
					{ name: 'Русский', value: 'ru' },
				))
		.addBooleanOption((option: SlashCommandBooleanOption) =>
			option.setName(i18next.t('cmd.slash.translate.options.public.name', { lng: 'en' }))
				.setDescription(i18next.t('cmd.slash.translate.options.public.description', { lng: 'en' }))
				.setRequired(false)
				.setNameLocalizations({
					'en-GB': i18next.t('cmd.slash.translate.options.public.name', { lng: 'en-GB' }),
					'en-US': i18next.t('cmd.slash.translate.options.public.name', { lng: 'en-US' }),
					'ru': i18next.t('cmd.slash.translate.options.public.name', { lng: 'ru' }),
					'de': i18next.t('cmd.slash.translate.options.public.name', { lng: 'de' }),
					"es-ES": i18next.t('cmd.slash.translate.options.public.name', { lng: 'es-ES' })
				})
				.setDescriptionLocalizations({
					'en-GB': i18next.t('cmd.slash.translate.options.public.description', { lng: 'en-GB' }),
					'en-US': i18next.t('cmd.slash.translate.options.public.description', { lng: 'en-US' }),
					'ru': i18next.t('cmd.slash.translate.options.public.description', { lng: 'ru' }),
					'de': i18next.t('cmd.slash.translate.options.public.description', { lng: 'de' }),
					"es-ES": i18next.t('cmd.slash.translate.options.public.description', { lng: 'es-ES' })
				})),


			async execute(client: ClientData, interaction: Interaction) {

			if(!interaction.isChatInputCommand()) return;

	await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') ?? false });

	try {
		const content = interaction.options.getString('content');
		const selectedLanguage = interaction.options.getString('language');

		if(content == null) {
	interaction.editReply({ content: 'You must specify the content I should translate!' });
	return;
}
			else {
	if (selectedLanguage == null) {
		interaction.editReply({ content: 'You must specify the language I should translate the content to!' });
		return;
	}
}

console.log(content!, interaction.locale!, selectedLanguage!);

const result = await translate(
	content!,
	{
		from: interaction.locale as Locale,
		to: selectedLanguage as Locale
	}
);

await interaction.editReply({ content: `${result}` });

		} catch (err: any) {
	console.error(chalk.redBright(err.stack));
	await interaction.editReply({ content: `There was an error while executing this command!` });
}
	},
};