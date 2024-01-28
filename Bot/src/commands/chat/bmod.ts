import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandBooleanOption, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandMentionableOption, SlashCommandChannelOption } from 'discord.js';
import { ClientData } from '../../resources/structures';

import i18next from 'i18next';

import { strings } from '../../locales/locales';
import Translate from '../../functions/translate';
import chalk from 'chalk';

export const
    BMOD_CMD_NAME = 'bmod',
    BMOD_SUBCMD_ENABLE = 'enable',
    BMOD_SUBCMD_DISABLE = 'disable',
    BMOD_SUBCMD_GROUP_CHANNELS = 'exempt-channels',
    BMOD_SUBCMD_GROUP_USERS = 'exempt-users',
    BMOD_SUBCMD_ADD = 'add',
    BMOD_SUBCMD_REMOVE = 'remove',
    BMOD_SUBCMD_LIST = 'list',
    BMOD_OPTION_CHANNEL = 'channel',
    BMOD_OPTION_MENTIONABLE = 'mentionable',
    BMOD_OPTION_FILTER = 'filter';

const
    VALUE_ALL = 'all',
    VALUE_CUSTOM = 'custom',
    VALUE_PROFANITY = 'profanity',
    VALUE_SEXUAL_CONTENT = 'sexual-content',
    VALUE_SLURS = 'slurs',
    VALUE_SPAM = 'spam';


export default {
    commandName: BMOD_CMD_NAME,
    cooldown: 10,
    guilds: null,
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDMPermission(false)
        .setNSFW(false)
        .setName(BMOD_CMD_NAME)
        .setDescription('Manage bilingual moderation filters in this server')

        //==========ENABLE AND DISABLE FILTERS==========//

        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
            .setName(BMOD_SUBCMD_ENABLE)
            .setDescription('Enables a bilingual moderation filter in this server')
            .addStringOption((option: SlashCommandStringOption) => option
                .setName(BMOD_OPTION_FILTER)
                .setDescription('Specify a filter to enable')
                .addChoices(
                    { name: 'Custom Filter', value: VALUE_CUSTOM },
                    { name: 'Profanity Filter', value: VALUE_PROFANITY },
                    { name: 'Sexual Content Filter', value: VALUE_SEXUAL_CONTENT },
                    { name: 'Slurs Filter', value: VALUE_SLURS },
                    { name: 'Spam Filter', value: VALUE_SPAM }
                )
            )
        )
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
            .setName(BMOD_SUBCMD_DISABLE)
            .setDescription('Disables a bilingual moderation filter in this server')
            .addStringOption((option: SlashCommandStringOption) => option
                .setName(BMOD_OPTION_FILTER)
                .setDescription('Specify a filter to disable')
                .addChoices(
                    { name: 'Custom Filter', value: VALUE_CUSTOM },
                    { name: 'Profanity Filter', value: VALUE_PROFANITY },
                    { name: 'Sexual Content Filter', value: VALUE_SEXUAL_CONTENT },
                    { name: 'Slurs Filter', value: VALUE_SLURS },
                    { name: 'Spam Filter', value: VALUE_SPAM }
                )
            )
        )

        //==========FILTER CHANNEL EXEMPTIONS==========//

        .addSubcommandGroup((group: SlashCommandSubcommandGroupBuilder) => group
            .setName(BMOD_SUBCMD_GROUP_CHANNELS)
            .setDescription('Manage channels to be exempt from bilingual moderation filters')
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(BMOD_SUBCMD_ADD)
                .setDescription('Add a channel exemption from any or all bilingual moderation filters')
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
                        { name: 'All Filters', value: VALUE_ALL },
                        { name: 'Custom Filter', value: VALUE_CUSTOM },
                        { name: 'Profanity Filter', value: VALUE_PROFANITY },
                        { name: 'Sexual Content Filter', value: VALUE_SEXUAL_CONTENT },
                        { name: 'Slurs Filter', value: VALUE_SLURS },
                        { name: 'Spam Filter', value: VALUE_SPAM }
                    )
                )
            )
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(BMOD_SUBCMD_REMOVE)
                .setDescription('Remove a channel exemption from any or all bilingual moderation filters')
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
                        { name: 'All Filters', value: VALUE_ALL },
                        { name: 'Custom Filter', value: VALUE_CUSTOM },
                        { name: 'Profanity Filter', value: VALUE_PROFANITY },
                        { name: 'Sexual Content Filter', value: VALUE_SEXUAL_CONTENT },
                        { name: 'Slurs Filter', value: VALUE_SLURS },
                        { name: 'Spam Filter', value: VALUE_SPAM }
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
                        { name: 'All Filters', value: VALUE_ALL },
                        { name: 'Custom Filter', value: VALUE_CUSTOM },
                        { name: 'Profanity Filter', value: VALUE_PROFANITY },
                        { name: 'Sexual Content Filter', value: VALUE_SEXUAL_CONTENT },
                        { name: 'Slurs Filter', value: VALUE_SLURS },
                        { name: 'Spam Filter', value: VALUE_SPAM }
                    )
                )
            )

        )

        //==========FILTER USER/ROLE EXEMPTIONS==========

        .addSubcommandGroup((group: SlashCommandSubcommandGroupBuilder) => group
            .setName(BMOD_SUBCMD_GROUP_USERS)
            .setDescription('Manage users and roles to be exempt from bilingual moderation filters')
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(BMOD_SUBCMD_ADD)
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
                        { name: 'All Filters', value: VALUE_ALL },
                        { name: 'Custom Filter', value: VALUE_CUSTOM },
                        { name: 'Profanity Filter', value: VALUE_PROFANITY },
                        { name: 'Sexual Content Filter', value: VALUE_SEXUAL_CONTENT },
                        { name: 'Slurs Filter', value: VALUE_SLURS },
                        { name: 'Spam Filter', value: VALUE_SPAM }
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
                        { name: 'All Filters', value: VALUE_ALL },
                        { name: 'Custom Filter', value: VALUE_CUSTOM },
                        { name: 'Profanity Filter', value: VALUE_PROFANITY },
                        { name: 'Sexual Content Filter', value: VALUE_SEXUAL_CONTENT },
                        { name: 'Slurs Filter', value: VALUE_SLURS },
                        { name: 'Spam Filter', value: VALUE_SPAM }
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
                        { name: 'All Filters', value: VALUE_ALL },
                        { name: 'Custom Filter', value: VALUE_CUSTOM },
                        { name: 'Profanity Filter', value: VALUE_PROFANITY },
                        { name: 'Sexual Content Filter', value: VALUE_SEXUAL_CONTENT },
                        { name: 'Slurs Filter', value: VALUE_SLURS },
                        { name: 'Spam Filter', value: VALUE_SPAM }
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

            if(subcmd === BMOD_SUBCMD_ENABLE) 
            {
                const FILTER = interaction.options.getString(BMOD_OPTION_FILTER);

                /*
                if(FILTER === VALUE_CUSTOM) {

                }
                */
            }
            else
            {

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