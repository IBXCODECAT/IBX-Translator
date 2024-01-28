import { SlashCommandBuilder, Interaction, PermissionFlagsBits, SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandMentionableOption, SlashCommandChannelOption } from 'discord.js';
import { ClientData } from '../../resources/structures';
import chalk from 'chalk';

import { FILTER_CHOICE, COMMAND_DESCRIPTIONS, COMMAND_NAMES, SUBCOMMANDGROUP_CHANNELS_DESCRIPTIONS, SUBCOMMANDGROUP_CHANNELS_NAMES, SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_DESCRIPTIONS, SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_NAMES, SUBCOMMANDGROUP_MENTIONABLES_DESCRIPTIONS, SUBCOMMANDGROUP_MENTIONABLES_NAMES, SUBCOMMAND_DISABLE_DESCRIPTIONS, SUBCOMMAND_DISABLE_NAMES, SUBCOMMAND_ENABLE_DESCRIPTIONS, SUBCOMMAND_ENABLE_NAMES, SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_NAMES, SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_DESCRIPTIONS, SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_ADD_NAMES, SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_ADD_DESCRIPTIONS, SUBCOMMMANDGROUP_MENTIONABLES_SUBCOMMAND_REMOVE_NAMES, SUBCOMMMANDGROUP_MENTIONABLES_SUBCOMMAND_REMOVE_DESCRIPTIONS, SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_LIST_NAMES, SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_LIST_DESCRIPTIONS, SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_LIST_NAMES, SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_LIST_DESCRIPTIONS, FILTER_NAMES, FILTER_DESCRIPTIONS, OPTION_CHANNEL_NAMES, OPTION_CHANNEL_DESCRIPTIONS, OPTION_MENTIONABLE_NAMES } from '../../resources/bmod';

export default {
    commandName: COMMAND_NAMES['en-US'],
    cooldown: 10,
    guilds: null,
    data: new SlashCommandBuilder()
        .setName(COMMAND_NAMES['en-US'])
        .setNameLocalizations(COMMAND_NAMES)
        .setDescription(COMMAND_DESCRIPTIONS['en-US'])
        .setDescriptionLocalizations(COMMAND_DESCRIPTIONS)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDMPermission(false)
        .setNSFW(false)
        //Enable Filter
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
            .setName(SUBCOMMAND_ENABLE_NAMES['en-US'])
            .setNameLocalizations(SUBCOMMAND_ENABLE_NAMES)
            .setDescription(SUBCOMMAND_ENABLE_DESCRIPTIONS['en-US'])
            .setDescriptionLocalizations(SUBCOMMAND_ENABLE_DESCRIPTIONS)
            .addStringOption((option: SlashCommandStringOption) => option
                    .setName(FILTER_NAMES['en-US'])
                    .setNameLocalizations(FILTER_NAMES)
                    .setDescription(FILTER_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(FILTER_DESCRIPTIONS)
                    .addChoices(
                        FILTER_CHOICE.ALL,
                        FILTER_CHOICE.CUSTOM,
                        FILTER_CHOICE.PROFANITY,
                        FILTER_CHOICE.SEXUAL_CONTENT,
                        FILTER_CHOICE.SLURS,
                        FILTER_CHOICE.SPAM
                    )
                    .setRequired(false)
                )
        )
        //Disable filter
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
            .setName(SUBCOMMAND_DISABLE_NAMES['en-US'])
            .setNameLocalizations(SUBCOMMAND_DISABLE_NAMES)
            .setDescription(SUBCOMMAND_DISABLE_DESCRIPTIONS['en-US'])
            .setDescriptionLocalizations(SUBCOMMAND_DISABLE_DESCRIPTIONS)
            .addStringOption((option: SlashCommandStringOption) => option
                    .setName(FILTER_NAMES['en-US'])
                    .setNameLocalizations(FILTER_NAMES)
                    .setDescription(FILTER_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(FILTER_DESCRIPTIONS)
                    .addChoices(
                        FILTER_CHOICE.ALL,
                        FILTER_CHOICE.CUSTOM,
                        FILTER_CHOICE.PROFANITY,
                        FILTER_CHOICE.SEXUAL_CONTENT,
                        FILTER_CHOICE.SLURS,
                        FILTER_CHOICE.SPAM
                    )
                    .setRequired(false)
                )
        )
        //==========FILTER CHANNEL EXEMPTIONS==========//
        .addSubcommandGroup((group: SlashCommandSubcommandGroupBuilder) => group
            .setName(SUBCOMMANDGROUP_CHANNELS_NAMES['en-US'])
            .setNameLocalizations(SUBCOMMANDGROUP_CHANNELS_NAMES)
            .setDescription(SUBCOMMANDGROUP_CHANNELS_DESCRIPTIONS['en-US'])
            .setDescriptionLocalizations(SUBCOMMANDGROUP_CHANNELS_DESCRIPTIONS)
            //Add Channel Filter Exemption
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_NAMES['en-US'])
                .setNameLocalizations(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_NAMES)
                .setDescription(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_DESCRIPTIONS['en-US'])
                .setDescriptionLocalizations(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_DESCRIPTIONS)
                .addChannelOption((option: SlashCommandChannelOption) => option
                    .setName(OPTION_CHANNEL_NAMES['en-US'])
                    .setNameLocalizations(OPTION_CHANNEL_NAMES)
                    .setDescription(OPTION_CHANNEL_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(OPTION_CHANNEL_DESCRIPTIONS)
                    .setRequired(true)
                )
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(FILTER_NAMES['en-US'])
                    .setNameLocalizations(FILTER_NAMES)
                    .setDescription(FILTER_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(FILTER_DESCRIPTIONS)
                    .addChoices(
                        FILTER_CHOICE.ALL,
                        FILTER_CHOICE.CUSTOM,
                        FILTER_CHOICE.PROFANITY,
                        FILTER_CHOICE.SEXUAL_CONTENT,
                        FILTER_CHOICE.SLURS,
                        FILTER_CHOICE.SPAM
                    )
                    .setRequired(false)
                )
            )
            //Remove Channel Fitler Exemption
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_NAMES['en-US'])
                .setNameLocalizations(SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_NAMES)
                .setDescription(SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_DESCRIPTIONS['en-US'])
                .setDescriptionLocalizations(SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_DESCRIPTIONS)
                .addChannelOption((option: SlashCommandChannelOption) => option
                    .setName(OPTION_CHANNEL_NAMES['en-US'])
                    .setNameLocalizations(OPTION_CHANNEL_NAMES)
                    .setDescription(OPTION_CHANNEL_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(OPTION_CHANNEL_DESCRIPTIONS)
                    .setRequired(true)
                )
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(FILTER_NAMES['en-US'])
                    .setNameLocalizations(FILTER_NAMES)
                    .setDescription(FILTER_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(FILTER_DESCRIPTIONS)
                    .addChoices(
                        FILTER_CHOICE.ALL,
                        FILTER_CHOICE.CUSTOM,
                        FILTER_CHOICE.PROFANITY,
                        FILTER_CHOICE.SEXUAL_CONTENT,
                        FILTER_CHOICE.SLURS,
                        FILTER_CHOICE.SPAM
                    )
                    .setRequired(false)
                )
            )
            //List Channel Filter Exemptions
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_LIST_NAMES['en-US'])
                .setNameLocalizations(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_LIST_NAMES)
                .setDescription(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_LIST_DESCRIPTIONS['en-US'])
                .setDescriptionLocalizations(SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_LIST_DESCRIPTIONS)
                .setDescription('List all channel exemptions from any or all bilingual moderation filters')
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(FILTER_NAMES['en-US'])
                    .setNameLocalizations(FILTER_NAMES)
                    .setDescription(FILTER_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(FILTER_DESCRIPTIONS)
                    .addChoices(
                        FILTER_CHOICE.ALL,
                        FILTER_CHOICE.CUSTOM,
                        FILTER_CHOICE.PROFANITY,
                        FILTER_CHOICE.SEXUAL_CONTENT,
                        FILTER_CHOICE.SLURS,
                        FILTER_CHOICE.SPAM
                    )
                    .setRequired(false)
                )
            )

        )
        //==========FILTER USER/ROLE EXEMPTIONS==========
        .addSubcommandGroup((group: SlashCommandSubcommandGroupBuilder) => group
            .setName(SUBCOMMANDGROUP_MENTIONABLES_NAMES['en-US'])
            .setNameLocalizations(SUBCOMMANDGROUP_MENTIONABLES_NAMES)
            .setDescription(SUBCOMMANDGROUP_MENTIONABLES_DESCRIPTIONS['en-US'])
            .setDescriptionLocalizations(SUBCOMMANDGROUP_MENTIONABLES_DESCRIPTIONS)
            //Add User/Role Filter Exemption
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_ADD_NAMES['en-US'])
                .setNameLocalizations(SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_ADD_NAMES)
                .setDescription(SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_ADD_DESCRIPTIONS['en-US'])
                .setDescriptionLocalizations(SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_ADD_DESCRIPTIONS)
                .addMentionableOption((option: SlashCommandMentionableOption) => option
                    .setName(OPTION_MENTIONABLE_NAMES['en-US'])
                    .setNameLocalizations(OPTION_MENTIONABLE_NAMES)
                    .setDescription(OPTION_CHANNEL_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(OPTION_CHANNEL_DESCRIPTIONS)
                    .setRequired(true)
                )
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(FILTER_NAMES['en-US'])
                    .setNameLocalizations(FILTER_NAMES)
                    .setDescription(FILTER_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(FILTER_DESCRIPTIONS)
                    .addChoices(
                        FILTER_CHOICE.ALL,
                        FILTER_CHOICE.CUSTOM,
                        FILTER_CHOICE.PROFANITY,
                        FILTER_CHOICE.SEXUAL_CONTENT,
                        FILTER_CHOICE.SLURS,
                        FILTER_CHOICE.SPAM
                    )
                    .setRequired(false)
                )
            )
            //Remove User/Role Filter Exemption
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(SUBCOMMMANDGROUP_MENTIONABLES_SUBCOMMAND_REMOVE_NAMES['en-US'])
                .setNameLocalizations(SUBCOMMMANDGROUP_MENTIONABLES_SUBCOMMAND_REMOVE_NAMES)
                .setDescription(SUBCOMMMANDGROUP_MENTIONABLES_SUBCOMMAND_REMOVE_DESCRIPTIONS['en-US'])
                .setDescriptionLocalizations(SUBCOMMMANDGROUP_MENTIONABLES_SUBCOMMAND_REMOVE_DESCRIPTIONS)
                .addMentionableOption((option: SlashCommandMentionableOption) => option
                    .setName(OPTION_MENTIONABLE_NAMES['en-US'])
                    .setNameLocalizations(OPTION_MENTIONABLE_NAMES)
                    .setDescription(OPTION_CHANNEL_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(OPTION_CHANNEL_DESCRIPTIONS)
                    .setRequired(true)
                )
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(FILTER_NAMES['en-US'])
                    .setNameLocalizations(FILTER_NAMES)
                    .setDescription(FILTER_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(FILTER_DESCRIPTIONS)
                    .addChoices(
                        FILTER_CHOICE.ALL,
                        FILTER_CHOICE.CUSTOM,
                        FILTER_CHOICE.PROFANITY,
                        FILTER_CHOICE.SEXUAL_CONTENT,
                        FILTER_CHOICE.SLURS,
                        FILTER_CHOICE.SPAM
                    )
                    .setRequired(false)
                )
            )
            //List User/Role Filter Exemptions
            .addSubcommand((subcommand: SlashCommandSubcommandBuilder) => subcommand
                .setName(SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_LIST_NAMES['en-US'])
                .setNameLocalizations(SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_LIST_NAMES)
                .setDescription(SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_LIST_DESCRIPTIONS['en-US'])
                .setDescriptionLocalizations(SUBCOMMANDGROUP_MENTIONABLES_SUBCOMMAND_LIST_DESCRIPTIONS)
                .addStringOption((option: SlashCommandStringOption) => option
                    .setName(FILTER_NAMES['en-US'])
                    .setNameLocalizations(FILTER_NAMES)
                    .setDescription(FILTER_DESCRIPTIONS['en-US'])
                    .setDescriptionLocalizations(FILTER_DESCRIPTIONS)
                    .addChoices(
                        FILTER_CHOICE.ALL,
                        FILTER_CHOICE.CUSTOM,
                        FILTER_CHOICE.PROFANITY,
                        FILTER_CHOICE.SEXUAL_CONTENT,
                        FILTER_CHOICE.SLURS,
                        FILTER_CHOICE.SPAM
                    )
                    .setRequired(false)
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

        } catch (err: any) {
            console.error(chalk.redBright(err.stack));
            await interaction.editReply({ content: `There was an error while executing this command!` });
        }
    },
};