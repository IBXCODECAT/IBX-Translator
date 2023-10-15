import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption } from 'discord.js';
import { ClientData } from '../../resources/structures';

import i18next from 'i18next';

import { strings } from '../../locales/locales';
import Translate from '../../functions/translate';
import chalk from 'chalk';

const DISCORD_REF_NAME = 'translate';

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
			'en-GB': i18next.t(strings.translateCommandName, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.translateCommandName, { lng: 'en-US' }),
			'ru': i18next.t(strings.translateCommandName, { lng: 'ru' }),
			'de': i18next.t(strings.translateCommandName, { lng: 'de' }),
			"es-ES": i18next.t(strings.translateCommandName, { lng: 'es-ES' })
		})
		.setDescription(i18next.t(strings.translateCommandDescription, { lng: 'en' }))
		.setDescriptionLocalizations({
			'en-GB': i18next.t(strings.translateCommandDescription, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.translateCommandDescription, { lng: 'en-US' }),
			'ru': i18next.t(strings.translateCommandDescription, { lng: 'ru' }),
			'de': i18next.t(strings.translateCommandDescription, { lng: 'de' }),
			"es-ES": i18next.t(strings.translateCommandDescription, { lng: 'es-ES' })
		})
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName(i18next.t(strings.translateContentFieldName, { lng: 'en' }))
				.setDescription(i18next.t(strings.translateContentFieldDescription, { lng: 'en' }))
				.setRequired(true)
				.setNameLocalizations({
					'en-GB': i18next.t(strings.translateContentFieldName, { lng: 'en-GB' }),
					'en-US': i18next.t(strings.translateContentFieldName, { lng: 'en-US' }),
					'ru': i18next.t(strings.translateContentFieldName, { lng: 'ru' }),
					'de': i18next.t(strings.translateContentFieldName, { lng: 'de' }),
					"es-ES": i18next.t(strings.translateContentFieldName, { lng: 'es-ES' })
				}))
		.setDescriptionLocalizations({
			'en-GB': i18next.t(strings.translateContentFieldDescription, { lng: 'en-GB' }),
			'en-US': i18next.t(strings.translateContentFieldDescription, { lng: 'en-US' }),
			'ru': i18next.t(strings.translateContentFieldDescription, { lng: 'ru' }),
			'de': i18next.t(strings.translateContentFieldDescription, { lng: 'de' }),
			"es-ES": i18next.t(strings.translateContentFieldDescription, { lng: 'es-ES' })
		})
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName(i18next.t(strings.translateLanguageFieldName, { lng: 'en' }))
				.setDescription(i18next.t(strings.translateLanguageFieldDescription, { lng: 'en' }))
				.setRequired(true)
				.setNameLocalizations({
					'en-GB': i18next.t(strings.translateLanguageFieldName, { lng: 'en-GB' }),
					'en-US': i18next.t(strings.translateLanguageFieldName, { lng: 'en-US' }),
					'ru': i18next.t(strings.translateLanguageFieldName, { lng: 'ru' }),
					'de': i18next.t(strings.translateLanguageFieldName, { lng: 'de' }),
					"es-ES": i18next.t(strings.translateLanguageFieldName, { lng: 'es-ES' })
				})
				.setDescriptionLocalizations({
					'en-GB': i18next.t(strings.translateLanguageFieldDescription, { lng: 'en-GB' }),
					'en-US': i18next.t(strings.translateLanguageFieldDescription, { lng: 'en-US' }),
					'ru': i18next.t(strings.translateLanguageFieldDescription, { lng: 'ru' }),
					'de': i18next.t(strings.translateLanguageFieldDescription, { lng: 'de' }),
					"es-ES": i18next.t(strings.translateLanguageFieldDescription, { lng: 'es-ES' })
				})
				.addChoices(
					{ name: 'Deutsch', value: 'de' },
					{ name: 'English (British)', value: 'en-GB' },
					{ name: 'English (United States)', value: 'en-US' },
					{ name: 'Español', value: 'es-ES' },
					{ name: 'Русский', value: 'ru' },
				))
		.addBooleanOption((option: SlashCommandBooleanOption) =>
			option.setName(i18next.t(strings.translatePublicFieldName, { lng: 'en' }))
				.setDescription(i18next.t(strings.translatePublicFieldDescription, { lng: 'en' }))
				.setRequired(false)
				.setNameLocalizations({
					'en-GB': i18next.t(strings.translatePublicFieldName, { lng: 'en-GB' }),
					'en-US': i18next.t(strings.translatePublicFieldName, { lng: 'en-US' }),
					'ru': i18next.t(strings.translatePublicFieldName, { lng: 'ru' }),
					'de': i18next.t(strings.translatePublicFieldName, { lng: 'de' }),
					"es-ES": i18next.t(strings.translatePublicFieldName, { lng: 'es-ES' })
				})
				.setDescriptionLocalizations({
					'en-GB': i18next.t(strings.translatePublicFieldDescription, { lng: 'en-GB' }),
					'en-US': i18next.t(strings.translatePublicFieldDescription, { lng: 'en-US' }),
					'ru': i18next.t(strings.translatePublicFieldDescription, { lng: 'ru' }),
					'de': i18next.t(strings.translatePublicFieldDescription, { lng: 'de' }),
					"es-ES": i18next.t(strings.translatePublicFieldDescription, { lng: 'es-ES' })
				})),


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

			const result = await Translate(content!, interaction.locale!, selectedLanguage!);

			await interaction.editReply({ content: `${result}` });

		} catch (err: any) {
			console.error(chalk.redBright(err.stack));
			await interaction.editReply({ content: `There was an error while executing this command!` });
		}
	},
};