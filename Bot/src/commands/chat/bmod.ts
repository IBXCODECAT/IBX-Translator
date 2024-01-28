import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandMentionableOption, SlashCommandChannelOption } from 'discord.js';
import { ClientData } from '../../resources/structures';

import i18next from 'i18next';

import { LOCALE_CODES as LANG, strings } from '../../locales/locales';
import Translate from '../../functions/translate';
import chalk from 'chalk';

import { BMOD_FILTER_CHOICE, COMMAND_DESCRIPTIONS as COMMAND__descriptions, COMMAND_NAMES as COMMAND__names, SUBCOMMANDGROUP_CHANNELS_DESCRIPTION as SUBCOMMANDGROUP_CHANNELS__descriptions, SUBCOMMANDGROUP_CHANNELS_NAME as SUBCOMMANDGROUP_CHANNELS__names, SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_DESCRIPTIONS as SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD__descriptions, SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_NAMES as SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD__names, SUBCOMMANDGROUP_MENTIONABLES_DESCRIPTIONS, SUBCOMMANDGROUP_MENTIONABLES_NAMES, SUBCOMMAND_DISABLE_DESCRIPTION as SUBCOMMAND_DISABLE__descriptions, SUBCOMMAND_DISABLE_NAME as SUBCOMMAND_DISABLE__names, SUBCOMMAND_ENABLE_DESCRIPTION as SUBCOMMAND_ENABLE__descriptions, SUBCOMMAND_ENABLE_NAME as SUBCOMMAND_ENABLE__names, SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_NAMES as SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE__names, SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_DESCRIPTIONS as SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE__descriptions } from '../../resources/bmod';

export const
    BMOD_SUBCMD_ADD = 'add',
    BMOD_SUBCMD_REMOVE = 'remove',
    BMOD_SUBCMD_LIST = 'list',
    BMOD_OPTION_CHANNEL = 'channel',
    BMOD_OPTION_MENTIONABLE = 'mentionable',
    BMOD_OPTION_FILTER = 'filter';

export default {
    commandName: COMMAND__names['en-US'],
    cooldown: 10,
    guilds: null,
    data: new SlashCommandBuilder()
        .setName(COMMAND__names['en-US'])
        .setNameLocalizations(COMMAND__names)
        .setDescription(COMMAND__descriptions['en-US'])
        .setDescriptionLocalizations(COMMAND__descriptions)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDMPermission(false)
        .setNSFW(false)

        //Enable Filter
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
            .setName(SUBCOMMAND_ENABLE__names['en-US'])
            .setNameLocalizations(SUBCOMMAND_ENABLE__names)
            .setDescription(SUBCOMMAND_ENABLE__descriptions['en-US'])
            .setDescriptionLocalizations(SUBCOMMAND_ENABLE__descriptions)
            .addStringOption((option: SlashCommandStringOption) => option
                .setName(BMOD_OPTION_FILTER)
                .setDescription('Specify a filter to enable')
                .addChoices(
                    BMOD_FILTER_CHOICE.ALL,
                    BMOD_FILTER_CHOICE.CUSTOM,
                    BMOD_FILTER_CHOICE.PROFANITY,
                    BMOD_FILTER_CHOICE.SEXUAL_CONTENT,
                    BMOD_FILTER_CHOICE.SLURS,
                    BMOD_FILTER_CHOICE.SPAM
                )
            )
        )

        //Disable filter
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
            .setName(SUBCOMMAND_DISABLE__names['en-US'])
            .setNameLocalizations(SUBCOMMAND_DISABLE__names)
            .setDescription(SUBCOMMAND_DISABLE__descriptions['en-US'])
            .setDescriptionLocalizations(SUBCOMMAND_DISABLE__descriptions)
            .addStringOption((option: SlashCommandStringOption) => option
                .setName(BMOD_OPTION_FILTER)
                .setDescription('Specify a filter to disable')
                .addChoices(
                    BMOD_FILTER_CHOICE.ALL,
                    BMOD_FILTER_CHOICE.CUSTOM,
                    BMOD_FILTER_CHOICE.PROFANITY,
                    BMOD_FILTER_CHOICE.SEXUAL_CONTENT,
                    BMOD_FILTER_CHOICE.SLURS,
                    BMOD_FILTER_CHOICE.SPAM
                )
            )
        )


        //==========FILTER CHANNEL EXEMPTIONS==========//

        .addSubcommandGroup((group: SlashCommandSubcommandGroupBuilder) => group
            .setName(SUBCOMMANDGROUP_CHANNELS__names['en-US'])
            .setNameLocalizations(SUBCOMMANDGROUP_CHANNELS__names)
            .setDescription(SUBCOMMANDGROUP_CHANNELS__descriptions['en-US'])
            .setDescriptionLocalizations(SUBCOMMANDGROUP_CHANNELS__descriptions)
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD__names['en-US'])
                .setNameLocalizations(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD__names)
                .setDescription(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD__descriptions['en-US'])
                .setDescriptionLocalizations(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD__descriptions)
                .addChannelOption((option: SlashCommandChannelOption) => option
                    .setName(BMOD_OPTION_CHANNEL)
                    .setDescription('Specify a channel to exempt from any or all bilingual moderation filters')
                    .setRequired(true)
                )
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(BMOD_OPTION_FILTER)
                    .setDescription('Apply exemptions to a designated filter or all filters if unspecified')
                    .setRequired(false)
                    .addChoices(
                        BMOD_FILTER_CHOICE.ALL,
                        BMOD_FILTER_CHOICE.CUSTOM,
                        BMOD_FILTER_CHOICE.PROFANITY,
                        BMOD_FILTER_CHOICE.SEXUAL_CONTENT,
                        BMOD_FILTER_CHOICE.SLURS,
                        BMOD_FILTER_CHOICE.SPAM
                    )
                )
            )
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE__names['en-US'])
                .setNameLocalizations(SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE__names)
                .setDescription(SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE__descriptions['en-US'])
                .setDescriptionLocalizations(SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE__descriptions)
                .addChannelOption((option: SlashCommandChannelOption) => option
                    .setName(BMOD_OPTION_CHANNEL)
                    .setDescription('Specify a channel to remove from the list of exemptions')
                    .setRequired(true)
                )
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(BMOD_OPTION_FILTER)
                    .setDescription('Remove exemptions from a designated filter or all filters if unspecified')
                    .setRequired(false)
                    .addChoices(
                        BMOD_FILTER_CHOICE.ALL,
                        BMOD_FILTER_CHOICE.CUSTOM,
                        BMOD_FILTER_CHOICE.PROFANITY,
                        BMOD_FILTER_CHOICE.SEXUAL_CONTENT,
                        BMOD_FILTER_CHOICE.SLURS,
                        BMOD_FILTER_CHOICE.SPAM
                    )
                )
            )
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(BMOD_SUBCMD_LIST)
                .setDescription('List all channel exemptions from any or all bilingual moderation filters')
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(BMOD_OPTION_FILTER)
                    .setDescription('List exemptions from a designated filter or all filters if unspecified')
                    .setRequired(false)
                    .addChoices(
                        BMOD_FILTER_CHOICE.ALL,
                        BMOD_FILTER_CHOICE.CUSTOM,
                        BMOD_FILTER_CHOICE.PROFANITY,
                        BMOD_FILTER_CHOICE.SEXUAL_CONTENT,
                        BMOD_FILTER_CHOICE.SLURS,
                        BMOD_FILTER_CHOICE.SPAM
                    )
                )
            )

        )

        //==========FILTER USER/ROLE EXEMPTIONS==========

        .addSubcommandGroup((group: SlashCommandSubcommandGroupBuilder) => group
            .setName(SUBCOMMANDGROUP_MENTIONABLES_NAMES['en-US'])
            .setNameLocalizations(SUBCOMMANDGROUP_MENTIONABLES_NAMES)
            .setDescription(SUBCOMMANDGROUP_MENTIONABLES_DESCRIPTIONS['en-US'])
            .setDescriptionLocalizations(SUBCOMMANDGROUP_MENTIONABLES_DESCRIPTIONS)
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(sU)
                .setDescription('Add a user or role exemption to any or all bilingual moderation filters')
                .addMentionableOption((option: SlashCommandMentionableOption) => option
                    .setName(BMOD_OPTION_MENTIONABLE)
                    .setDescription('Specify a user or role to exempt from any or all bilingual moderation filters')
                    .setRequired(true)
                )
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(BMOD_OPTION_FILTER)
                    .setDescription('Apply exemptions to a designated filter or all filters if unspecified')
                    .setRequired(false)
                    .addChoices(
                        BMOD_FILTER_CHOICE.ALL,
                        BMOD_FILTER_CHOICE.CUSTOM,
                        BMOD_FILTER_CHOICE.PROFANITY,
                        BMOD_FILTER_CHOICE.SEXUAL_CONTENT,
                        BMOD_FILTER_CHOICE.SLURS,
                        BMOD_FILTER_CHOICE.SPAM
                    )
                )
            )
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(BMOD_SUBCMD_REMOVE)
                .setDescription('Removes a user or role exclusion from any or all bilingual moderation filters')
                .addMentionableOption((option: SlashCommandMentionableOption) => option
                    .setName(BMOD_OPTION_MENTIONABLE)
                    .setDescription('Specify a user or role to remove from the list of exemptions')
                    .setRequired(true)
                )
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(BMOD_OPTION_FILTER)
                    .setDescription('Remove exemptions from a designated filter or all filters if unspecified')
                    .setRequired(false)
                    .addChoices(
                        BMOD_FILTER_CHOICE.ALL,
                        BMOD_FILTER_CHOICE.CUSTOM,
                        BMOD_FILTER_CHOICE.PROFANITY,
                        BMOD_FILTER_CHOICE.SEXUAL_CONTENT,
                        BMOD_FILTER_CHOICE.SLURS,
                        BMOD_FILTER_CHOICE.SPAM
                    )
                )
            )
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(BMOD_SUBCMD_LIST)
                .setDescription('List all user and role exemptions from any or all bilingual moderation filters')
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(BMOD_OPTION_FILTER)
                    .setDescription('List exemptions from a designated filter or all filters if unspecified')
                    .setRequired(false)
                    .addChoices(
                        BMOD_FILTER_CHOICE.ALL,
                        BMOD_FILTER_CHOICE.CUSTOM,
                        BMOD_FILTER_CHOICE.PROFANITY,
                        BMOD_FILTER_CHOICE.SEXUAL_CONTENT,
                        BMOD_FILTER_CHOICE.SLURS,
                        BMOD_FILTER_CHOICE.SPAM
                    )
                )
            )
        )
    ,

    async execute(client: ClientData, interaction: Interaction) {

        //Ignore if not a chat command
        if (!interaction.isChatInputCommand()) return;

        //Defer reply to prevent timeout
        await interaction.deferReply({ ephemeral: true });

        try {
            const subcmd_group = interaction.options.getSubcommandGroup();
            const subcmd = interaction.options.getSubcommand();

            if (subcmd === BMOD_SUBCMD_ENABLE) {
                const FILTER = interaction.options.getString(BMOD_OPTION_FILTER);

                /*
                if(FILTER === VALUE_CUSTOM) {
            
                }
                */
            }
            else {

            }



            if (subcmd_group === BMOD_SUBCMD_GROUP_CHANNELS) {
                const CHANNEL = interaction.options.getChannel(BMOD_OPTION_CHANNEL);
                const FILTER = interaction.options.getString(BMOD_OPTION_FILTER);

                if (subcmd === BMOD_SUBCMD_ADD) {

                }

                if (subcmd === BMOD_SUBCMD_REMOVE) {

                }

                if (subcmd === BMOD_SUBCMD_LIST) {

                }
            }

            if (subcmd_group === BMOD_SUBCMD_GROUP_USERS) {

            }


            switch (subcmd_group) {
                case BMOD_SUBCMD_GROUP_CHANNELS: {

                    break;
                }
                case BMOD_SUBCMD_GROUP_USERS: {

                    break;
                }

                default: {

                    break;
                }
            }


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