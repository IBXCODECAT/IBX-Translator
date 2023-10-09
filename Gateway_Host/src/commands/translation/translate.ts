import { SlashCommandBuilder, Interaction } from 'discord.js';
import { ClientData } from '../../structures';

const translate = require('translate-google');

module.exports = {
	commandName: 'translate',
	cooldown: 15,
	guilds: null,
	data: new SlashCommandBuilder()
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
		.addStringOption(option => 
			option.setName('text-content')
				/*.setNameLocalizations({
					"en-GB": 'text-content',
					"en-US": 'text-content',
					de: 'Textinhalt',
					ru: 'текстовое-содержание',
					"es-ES": 'contenido-del-texto'
				})*/
				.setDescription('Specify the content I should translate.')
				.setDescriptionLocalizations({
					"en-GB": 'Specify the content I should translate.',
					"en-US": 'Specify the content I should translate.',
					de: 'Geben Sie den Inhalt an, den ich übersetzen soll',
					ru: 'Укажите контент, который я должен перевести',
					"es-ES": 'Especificar el contenido que debo traducir'
				})
				.setRequired(true))
		.addStringOption(option =>
			option.setName('language')
				/*.setNameLocalizations({
					"en-GB": 'language',
					'en-US': 'language',
					de: 'Sprache',
					ru: 'язык',
					"es-ES": 'idioma'
				})*/
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
					{ name: 'Deutsch', value: 'de'},
					{ name: 'РУССКИЙ', value: 'ru' },
					{ name: 'Español', value: 'es-ES' },
				))
		.addBooleanOption(option =>
			option.setName('public'))
				.setNameLocalizations({
					"en-GB": 'public',
					"en-US": 'public',
					de: 'öffentlich',
					ru: 'публичный',
					"es-ES": 'público'
				})
				.setDescription('Specify if this message should be sent in this channel.')
				.setDescriptionLocalizations({
					"en-GB": 'Specify if this message should be sent in this channel.',
					"en-US": 'Specify if this message should be sent in this channel.',
					de: 'Geben Sie an, ob diese Nachricht in diesem Kanal gesendet werden soll',
					ru: 'Укажите, должно ли это сообщение быть отправлено в этом канале',
					"es-ES": 'Especificar si este mensaje debe ser enviado en este canal'
				}),

	async execute(client: ClientData, interaction: Interaction) {

		if(!interaction.isChatInputCommand()) return;

		await interaction.deferReply({ ephemeral: true });
		
		const transObj = {
			d: [true, 'true', interaction.options.getString('text-content')],
		}

		const selectedLanguage = interaction.options.getString('language');

		await interaction.editReply({ content: `Translating to ${selectedLanguage}...` });
	},
};