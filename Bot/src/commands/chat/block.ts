import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption } from 'discord.js';
import { ClientData } from '../../resources/structures';

import i18next from 'i18next';

import { strings } from '../../locales/locales';
import Translate from '../../functions/translate';
import chalk from 'chalk';

const DISCORD_REF_NAME = 'block';

export default {
	commandName: DISCORD_REF_NAME,
	cooldown: 15,
	guilds: null,
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.setDMPermission(false)
		.setNSFW(false)
		.setName(DISCORD_REF_NAME)
		.setNameLocalizations({
			'en-GB': i18next.t(strings.blockCommandName, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.blockCommandName, { lng: 'en-US' }),
			'ru': i18next.t(strings.blockCommandName, { lng: 'ru' }),
			'de': i18next.t(strings.blockCommandName, { lng: 'de' }),
			"es-ES": i18next.t(strings.blockCommandName, { lng: 'es-ES' })
		})
		.setDescription(i18next.t(strings.blockCommandDescription, { lng: 'en' }))
		.setDescriptionLocalizations({
			'en-GB': i18next.t(strings.blockCommandDescription, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.blockCommandDescription, { lng: 'en-US' }),
			'ru': i18next.t(strings.blockCommandDescription, { lng: 'ru' }),
			'de': i18next.t(strings.blockCommandDescription, { lng: 'de' }),
			"es-ES": i18next.t(strings.blockCommandDescription, { lng: 'es-ES' })
		})
		.addStringOption((option: SlashCommandStringOption) => option
			.setName(i18next.t(strings.blockTypeFieldName, { lng: 'en' }))
			.setDescription(i18next.t(strings.blockTypeFieldDescription, { lng: 'en' }))
			.setRequired(true)
			.setNameLocalizations({
				'en-GB': i18next.t(strings.blockTypeFieldName, { lng: 'en-GB' }),
				'en-US': i18next.t(strings.blockTypeFieldName, { lng: 'en-US' }),
				'ru': i18next.t(strings.blockTypeFieldName, { lng: 'ru' }),
				'de': i18next.t(strings.blockTypeFieldName, { lng: 'de' }),
				"es-ES": i18next.t(strings.blockTypeFieldName, { lng: 'es-ES' })
			}).addChoices(
				{
					name: 'custom',
					value: 'custom',
					name_localizations: {
						'en-GB': i18next.t(strings.blockTypeFieldChoiceCustom, { lng: 'en-GB' }),
						'en-US': i18next.t(strings.blockTypeFieldChoiceCustom, { lng: 'en-US' }),
						'ru': i18next.t(strings.blockTypeFieldChoiceCustom, { lng: 'ru' }),
						'de': i18next.t(strings.blockTypeFieldChoiceCustom, { lng: 'de' }),
						"es-ES": i18next.t(strings.blockTypeFieldChoiceCustom, { lng: 'es-ES' }),
					}
				},
				{ 
					name: 'profanity',
					value: 'profanity',
					name_localizations: {
						'en-GB': i18next.t(strings.blockTypeFieldChoiceProfanity, { lng: 'en-GB' }),
						'en-US': i18next.t(strings.blockTypeFieldChoiceProfanity, { lng: 'en-US' }),
						'ru': i18next.t(strings.blockTypeFieldChoiceProfanity, { lng: 'ru' }),
						'de': i18next.t(strings.blockTypeFieldChoiceProfanity, { lng: 'de' }),
						"es-ES": i18next.t(strings.blockTypeFieldChoiceProfanity, { lng: 'es-ES' }),
					},
				},
				{ 
					name: 'sexual',
					value: 'sexual',
					name_localizations: {
						'en-GB': i18next.t(strings.blockTypeFieldChoiceSexual, { lng: 'en-GB' }),
						'en-US': i18next.t(strings.blockTypeFieldChoiceSexual, { lng: 'en-US' }),
						'ru': i18next.t(strings.blockTypeFieldChoiceSexual, { lng: 'ru' }),
						'de': i18next.t(strings.blockTypeFieldChoiceSexual, { lng: 'de' }),
						"es-ES": i18next.t(strings.blockTypeFieldChoiceSexual, { lng: 'es-ES' }),
					},
				},
				{ 
					name: 'slurs',
					value: 'slurs',
					name_localizations: {
						'en-GB': i18next.t(strings.blockTypeFieldChoiceSlurs, { lng: 'en-GB' }),
						'en-US': i18next.t(strings.blockTypeFieldChoiceSlurs, { lng: 'en-US' }),
						'ru': i18next.t(strings.blockTypeFieldChoiceSlurs, { lng: 'ru' }),
						'de': i18next.t(strings.blockTypeFieldChoiceSlurs, { lng: 'de' }),
						"es-ES": i18next.t(strings.blockTypeFieldChoiceSlurs, { lng: 'es-ES' }),
					},
				},
				{
					name: 'spam',
					value: 'spam',
					name_localizations: {
						'en-GB': i18next.t(strings.blockTypeFieldChoiceSpam, { lng: 'en-GB' }),
						'en-US': i18next.t(strings.blockTypeFieldChoiceSpam, { lng: 'en-US' }),
						'ru': i18next.t(strings.blockTypeFieldChoiceSpam, { lng: 'ru' }),
						'de': i18next.t(strings.blockTypeFieldChoiceSpam, { lng: 'de' }),
						"es-ES": i18next.t(strings.blockTypeFieldChoiceSpam, { lng: 'es-ES' }),
					}
				},
			)).setDescriptionLocalizations({
				'en-GB': i18next.t(strings.blockTypeFieldDescription, { lng: 'en-GB' }),
				'en-US': i18next.t(strings.blockTypeFieldDescription, { lng: 'en-US' }),
				'ru': i18next.t(strings.blockTypeFieldDescription, { lng: 'ru' }),
				'de': i18next.t(strings.blockTypeFieldDescription, { lng: 'de' }),
				"es-ES": i18next.t(strings.blockTypeFieldDescription, { lng: 'es-ES' })
			}),




	async execute(client: ClientData, interaction: Interaction) {

		if (!interaction.isChatInputCommand()) return;

		await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') ?? false });

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

			const result = await Translate(content!, selectedLanguage!, interaction.locale!,);

			await interaction.editReply({ content: `${result}` });

		} catch (err: any) {
			console.error(chalk.redBright(err.stack));
			await interaction.editReply({ content: `There was an error while executing this command!` });
		}
	},
};