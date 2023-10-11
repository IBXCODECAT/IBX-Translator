import {
    ActionRowBuilder,
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    ContextMenuCommandType,
    MessageContextMenuCommandInteraction,
    PermissionFlagsBits
} from "discord.js";

import { ClientData } from "../../resources/structures";

import i18next from "i18next";
import { GetLanguageSelectionComponents } from "../../components/Selects/language-select";

import { strings } from '../../locales/locales';

const DISCORD_REF_NAME = 'Translate This!';

export default {
    commandName: DISCORD_REF_NAME,
    cooldown: 15,
    guilds: null,
    data: new ContextMenuCommandBuilder()
        .setType(ApplicationCommandType.Message as ContextMenuCommandType)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .setDMPermission(true)
        .setName(DISCORD_REF_NAME)
        .setNameLocalizations({
            'en-GB': i18next.t(strings.tanslateThisCommandName, { lng: 'en-GB' }),
            'en-US': i18next.t(strings.tanslateThisCommandName, { lng: 'en-US' }),
            'ru': i18next.t(strings.tanslateThisCommandName, { lng: 'ru' }),
            'de': i18next.t(strings.tanslateThisCommandName, { lng: 'de' }),
            "es-ES": i18next.t(strings.tanslateThisCommandName, { lng: 'es-ES' })
        }),

    async execute(client: ClientData, interaction: MessageContextMenuCommandInteraction) {

        if(!interaction.isMessageContextMenuCommand()) return;

        await interaction.deferReply({ ephemeral: true });

        try {
            await interaction.editReply({
                content: interaction.targetMessage.content,
                components: [await GetLanguageSelectionComponents(interaction)]
            });

        } catch (error) {
            console.error(error);
            return;
        }

    }
}