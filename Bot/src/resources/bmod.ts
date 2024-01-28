import i18next from "i18next"
import { LOCALE_CODES, strings as STRINGS } from "../locales/locales"

//==========COMMAND INFO==========//

export const COMMAND_NAMES =
{
    'de': i18next.t(STRINGS.bmodCommandName, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodCommandName, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodCommandName, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodCommandName, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodCommandName, { lng: LOCALE_CODES.SPANISH }),
}

export const COMMAND_DESCRIPTIONS =
{
    'de': i18next.t(STRINGS.bmodCommandDescription, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodCommandDescription, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodCommandDescription, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodCommandDescription, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodCommandDescription, { lng: LOCALE_CODES.SPANISH }),
}

//==========SUBCOMMANDS==========//

export const SUBCOMMAND_ENABLE_NAME =
{
    'de': i18next.t(STRINGS.bmodEnableSubcommandName, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodEnableSubcommandName, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodEnableSubcommandName, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodEnableSubcommandName, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodEnableSubcommandName, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMAND_ENABLE_DESCRIPTION =
{
    'de': i18next.t(STRINGS.bmodEnableSubcommandDescription, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodEnableSubcommandDescription, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodEnableSubcommandDescription, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodEnableSubcommandDescription, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodEnableSubcommandDescription, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMAND_DISABLE_NAME =
{
    'de': i18next.t(STRINGS.bmodDisableSubcommandName, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodDisableSubcommandName, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodDisableSubcommandName, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodDisableSubcommandName, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodDisableSubcommandName, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMAND_DISABLE_DESCRIPTION =
{
    'de': i18next.t(STRINGS.bmodDisableSubcommandDescription, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodDisableSubcommandDescription, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodDisableSubcommandDescription, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodDisableSubcommandDescription, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodDisableSubcommandDescription, { lng: LOCALE_CODES.SPANISH }),
}

//==========SUBCOMMAND GROUPS==========//

export const SUBCOMMANDGROUP_CHANNELS_NAME =
{
    'de': i18next.t(STRINGS.bmodChannelsSubcommandGroupName, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodChannelsSubcommandGroupName, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodChannelsSubcommandGroupName, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodChannelsSubcommandGroupName, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodChannelsSubcommandGroupName, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMANDGROUP_CHANNELS_DESCRIPTION =
{
    'de': i18next.t(STRINGS.bmodChannelsSubcommandGroupDescription, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodChannelsSubcommandGroupDescription, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodChannelsSubcommandGroupDescription, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodChannelsSubcommandGroupDescription, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodChannelsSubcommandGroupDescription, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMANDGROUP_MENTIONABLES_NAMES =
{
    'de': i18next.t(STRINGS.bmodMentionableSubcommandGroupName, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodMentionableSubcommandGroupName, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodMentionableSubcommandGroupName, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodMentionableSubcommandGroupName, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodMentionableSubcommandGroupName, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMANDGROUP_MENTIONABLES_DESCRIPTIONS =
{
    'de': i18next.t(STRINGS.bmodMentionableSubcommandGroupDescription, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodMentionableSubcommandGroupDescription, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodMentionableSubcommandGroupDescription, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodMentionableSubcommandGroupDescription, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodMentionableSubcommandGroupDescription, { lng: LOCALE_CODES.SPANISH }),
}

//==========SUBCOMMAND GROUP <CHANNELS> SUBCOMMANDS==========//
export const SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_NAMES =
{
    'de': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandName, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandName, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandName, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandName, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandName, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMANDGROUP_CHANNELS_SUBCOMMAND_ADD_DESCRIPTIONS =
{
    'de': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandDescription, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandDescription, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandDescription, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandDescription, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodChannelsSubcommandGroupAddSubcommandDescription, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_NAMES =
{
    'de': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandName, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandName, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandName, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandName, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandName, { lng: LOCALE_CODES.SPANISH }),
}

export const SUBCOMMMANDGROUP_CHANNELS_SUBCOMMAND_REMOVE_DESCRIPTIONS =
{
    'de': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandDescription, { lng: LOCALE_CODES.GERMAN }),
    'en-GB': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandDescription, { lng: LOCALE_CODES.ENGLISH_GB }),
    'en-US': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandDescription, { lng: LOCALE_CODES.ENGLISH_US }),
    'ru': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandDescription, { lng: LOCALE_CODES.RUSSIAN }),
    'es-ES': i18next.t(STRINGS.bmodChannelsSubcommandGroupRemoveSubcommandDescription, { lng: LOCALE_CODES.SPANISH }),
}



const BMOD_FILTER_NAMES = {
    ALL: 'All Filters',
    CUSTOM: 'Custom Filter',
    PROFANITY: 'Profanity Filter',
    SEXUAL_CONTENT: 'Sexual Content Filter',
    SLURS: 'Slurs Filter',
    SPAM: 'Spam Filter',
}

const BMOD_FILTER_VALUES = {
    ALL: 0x0b.toString(),
    CUSTOM: 0x1b.toString(),
    PROFANITY: 0x2b.toString(),
    SEXUAL_CONTENT: 0x3b.toString(),
    SLURS: 0x4b.toString(),
    SPAM: 0x5b.toString(),
}

const BMOD_FILTER_NAME_LOCALIZATIONS = {
    ALL: {
        'de': i18next.t(BMOD_FILTER_NAMES.ALL, { lng: LOCALE_CODES.GERMAN }),
        'en-GB': i18next.t(BMOD_FILTER_NAMES.ALL, { lng: LOCALE_CODES.ENGLISH_GB }),
        'en-US': i18next.t(BMOD_FILTER_NAMES.ALL, { lng: LOCALE_CODES.ENGLISH_US }),
        'ru': i18next.t(BMOD_FILTER_NAMES.ALL, { lng: LOCALE_CODES.RUSSIAN }),
        'es-ES': i18next.t(BMOD_FILTER_NAMES.ALL, { lng: LOCALE_CODES.SPANISH }),
    },
    CUSTOM: {
        'de': i18next.t(BMOD_FILTER_NAMES.CUSTOM, { lng: LOCALE_CODES.GERMAN }),
        'en-GB': i18next.t(BMOD_FILTER_NAMES.CUSTOM, { lng: LOCALE_CODES.ENGLISH_GB }),
        'en-US': i18next.t(BMOD_FILTER_NAMES.CUSTOM, { lng: LOCALE_CODES.ENGLISH_US }),
        'ru': i18next.t(BMOD_FILTER_NAMES.CUSTOM, { lng: LOCALE_CODES.RUSSIAN }),
        'es-ES': i18next.t(BMOD_FILTER_NAMES.CUSTOM, { lng: LOCALE_CODES.SPANISH }),
    },
    PROFANITY: {
        'de': i18next.t(BMOD_FILTER_NAMES.PROFANITY, { lng: LOCALE_CODES.GERMAN }),
        'en-GB': i18next.t(BMOD_FILTER_NAMES.PROFANITY, { lng: LOCALE_CODES.ENGLISH_GB }),
        'en-US': i18next.t(BMOD_FILTER_NAMES.PROFANITY, { lng: LOCALE_CODES.ENGLISH_US }),
        'ru': i18next.t(BMOD_FILTER_NAMES.PROFANITY, { lng: LOCALE_CODES.RUSSIAN }),
        'es-ES': i18next.t(BMOD_FILTER_NAMES.PROFANITY, { lng: LOCALE_CODES.SPANISH }),
    },
    SEXUAL_CONTENT: {
        'de': i18next.t(BMOD_FILTER_NAMES.SEXUAL_CONTENT, { lng: LOCALE_CODES.GERMAN }),
        'en-GB': i18next.t(BMOD_FILTER_NAMES.SEXUAL_CONTENT, { lng: LOCALE_CODES.ENGLISH_GB }),
        'en-US': i18next.t(BMOD_FILTER_NAMES.SEXUAL_CONTENT, { lng: LOCALE_CODES.ENGLISH_US }),
        'ru': i18next.t(BMOD_FILTER_NAMES.SEXUAL_CONTENT, { lng: LOCALE_CODES.RUSSIAN }),
        'es-ES': i18next.t(BMOD_FILTER_NAMES.SEXUAL_CONTENT, { lng: LOCALE_CODES.SPANISH }),
    },
    SLURS: {
        'de': i18next.t(BMOD_FILTER_NAMES.SLURS, { lng: LOCALE_CODES.GERMAN }),
        'en-GB': i18next.t(BMOD_FILTER_NAMES.SLURS, { lng: LOCALE_CODES.ENGLISH_GB }),
        'en-US': i18next.t(BMOD_FILTER_NAMES.SLURS, { lng: LOCALE_CODES.ENGLISH_US }),
        'ru': i18next.t(BMOD_FILTER_NAMES.SLURS, { lng: LOCALE_CODES.RUSSIAN }),
        'es-ES': i18next.t(BMOD_FILTER_NAMES.SLURS, { lng: LOCALE_CODES.SPANISH }),
    },
    SPAM: {
        'de': i18next.t(BMOD_FILTER_NAMES.SPAM, { lng: LOCALE_CODES.GERMAN }),
        'en-GB': i18next.t(BMOD_FILTER_NAMES.SPAM, { lng: LOCALE_CODES.ENGLISH_GB }),
        'en-US': i18next.t(BMOD_FILTER_NAMES.SPAM, { lng: LOCALE_CODES.ENGLISH_US }),
        'ru': i18next.t(BMOD_FILTER_NAMES.SPAM, { lng: LOCALE_CODES.RUSSIAN }),
        'es-ES': i18next.t(BMOD_FILTER_NAMES.SPAM, { lng: LOCALE_CODES.SPANISH }),
    }
}

export const BMOD_FILTER_CHOICE = {
    ALL: {
        name: BMOD_FILTER_NAMES.ALL,
        value: BMOD_FILTER_VALUES.ALL,
        name_localizations: BMOD_FILTER_NAME_LOCALIZATIONS.ALL
    },
    CUSTOM: {
        name: BMOD_FILTER_NAMES.CUSTOM,
        value: BMOD_FILTER_VALUES.CUSTOM,
        name_localizations: BMOD_FILTER_NAME_LOCALIZATIONS.CUSTOM
    },
    PROFANITY: {
        name: BMOD_FILTER_NAMES.PROFANITY,
        value: BMOD_FILTER_VALUES.PROFANITY,
        name_localizations: BMOD_FILTER_NAME_LOCALIZATIONS.PROFANITY
    },
    SEXUAL_CONTENT: {
        name: BMOD_FILTER_NAMES.SEXUAL_CONTENT,
        value: BMOD_FILTER_VALUES.SEXUAL_CONTENT,
        name_localizations: BMOD_FILTER_NAME_LOCALIZATIONS.SEXUAL_CONTENT
    },
    SLURS: {
        name: BMOD_FILTER_NAMES.SLURS,
        value: BMOD_FILTER_VALUES.SLURS,
        name_localizations: BMOD_FILTER_NAME_LOCALIZATIONS.SLURS
    },
    SPAM: {
        name: BMOD_FILTER_NAMES.SPAM,
        value: BMOD_FILTER_VALUES.SPAM,
        name_localizations: BMOD_FILTER_NAME_LOCALIZATIONS.SPAM
    }
}