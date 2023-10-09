import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption } from 'discord.js';
import { ClientData } from '../../structures';
import { translate } from 'free-translate';
import { Locale } from 'free-translate/dist/types/locales';
import chalk from 'chalk';

export default {
	commandName: 'translate',
	cooldown: 15,
	guilds: null,
	data: new SlashCommandBuilder()
		.setNSFW(false)
		.setDMPermission(true)
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setName('translate')
		.setNameLocalizations({
			"en-GB": 'translate',
			"en-US": 'translate',
			de: 'übersetzen',
			ru: 'переводить',
			"es-ES": 'traducir'
		})
		.setDescription('translates a message.')
		.setDescriptionLocalizations({
			'en-GB': 'translates a message.',
			'en-US': 'translates a message.',
			de: 'übersetzt eine Nachricht',
			ru: 'переводит сообщение',
			"es-ES": 'traduce un mensaje'
		})
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName('content')
				.setNameLocalizations({
					"en-GB": 'text-content',
					"en-US": 'text-content',
					de: 'Textinhalt',
					ru: 'текстовое-содержание',
					"es-ES": 'contenido-del-texto'
				})
				.setDescription('Specify the content I should translate.')
				.setDescriptionLocalizations({
					"en-GB": 'Specify the content I should translate.',
					"en-US": 'Specify the content I should translate.',
					de: 'Geben Sie den Inhalt an, den ich übersetzen soll',
					ru: 'Укажите контент, который я должен перевести',
					"es-ES": 'Especificar el contenido que debo traducir'
				})
				.setRequired(true))
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName('language')
				.setNameLocalizations({
					"en-GB": 'language',
					'en-US': 'language',
					de: 'Sprache',
					ru: 'язык',
					"es-ES": 'idioma'
				})
				.setDescription('Specify the language I should translate the content to.')
				.setDescriptionLocalizations({
					"en-GB": 'Specify the language I should translate the content to.',
					"en-US": 'Specify the language I should translate the content to.',
					de: 'Geben Sie die Sprache an, in die ich den Inhalt übersetzen soll',
					ru: 'Укажите язык, на который я должен перевести контент',
					"es-ES": 'Especificar el idioma al que debo traducir el contenido'
				})
				.setRequired(true)
				.addChoices(
					{ name: 'English (British)', value: 'en-GB' },
					{ name: 'English (United States)', value: 'en-US' },
					{ name: 'Deutsch', value: 'de' },
					{ name: 'РУССКИЙ', value: 'ru' },
					{ name: 'Español', value: 'es-ES' },
				))
		.addBooleanOption((option: SlashCommandBooleanOption) =>
			option.setName('public')
				.setNameLocalizations({
					"en-GB": 'public',
					"en-US": 'public',
					de: 'öffentlich',
					ru: 'публичный',
					"es-ES": 'público'
				})
				.setDescription('Specify if this message should be sent to everyone in this channel.')),

	async execute(client: ClientData, interaction: Interaction) {

		if (!interaction.isChatInputCommand()) return;

		await interaction.deferReply({ ephemeral: true });

		try {
			const content = interaction.options.getString('content');
			const selectedLanguage = interaction.options.getString('language');

			if (content == null) {
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

			await interaction.editReply({ content: `Translating from ${interaction.locale!} to ${selectedLanguage}` });

			const result = await translate(
				content!,
				{
					from: interaction.locale as Locale,
					to: selectedLanguage as Locale
				}
			);

			await interaction.followUp({ content: `${interaction.user} says ${result}` });
		} catch (err: any) {
			console.error(chalk.redBright(err.stack));
			await interaction.editReply({ content: `There was an error while executing this command!` });
		}
	},
};