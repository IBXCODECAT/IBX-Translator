import {
    ActionRowBuilder,
    Interaction,
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
    StringSelectMenuOptionBuilder
} from "discord.js";

import { ClientData } from "../../resources/structures";
import i18next from "i18next";

import { strings } from '../../locales/locales';

import chalk from 'chalk';
import Translate from "../../functions/translate";

let language_select: StringSelectMenuBuilder | undefined;

const customId = 'language-select';

export default {
    componentId: customId,
    async execute(client: ClientData, interaction: Interaction) {
        
        if(!interaction.isStringSelectMenu())
        {
            console.error(chalk.redBright(`[ERR] An interaction '${customId}' expected ${(StringSelectMenuInteraction).name} but got ${interaction} instead!`));
            return;
        }
        
        await interaction.deferReply({ ephemeral: true });

        const result = await Translate(interaction.message.content, interaction.values[0], interaction.locale);

        interaction.editReply({ content: `${result}` })
    }
}

async function InitializeSelectionComponents(locale: string) {
    language_select = new StringSelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(i18next.t(strings.translateThisLanguageSelectPlaceholder, { lng: locale }))
        .addOptions([
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.german, { lng: locale }))
                .setValue('de')
                .setEmoji('🇩🇪'),
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.english_gb, { lng: locale }))
                .setValue('en-GB')
                .setEmoji('🇬🇧'),
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.english_us, { lng: locale }))
                .setValue('en-US')
                .setEmoji('🇺🇸'),
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.spanish, { lng: locale }))
                .setValue('es') //Must be ES instead of ES-ES because of the way the translate package works.
                .setEmoji('🇪🇸'),
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.russian, { lng: locale }))
                .setValue('ru')
                .setEmoji('🇷🇺'),
        ]);
}

//This should only be called by a command interaction's execute method to get the data required to build the action row(s).
export async function GetLanguageSelectionComponents(i: Interaction): Promise<ActionRowBuilder<StringSelectMenuBuilder>> {
    await InitializeSelectionComponents(i.locale);

    const action_row: ActionRowBuilder<StringSelectMenuBuilder> = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(language_select!);
    return action_row as ActionRowBuilder<StringSelectMenuBuilder>;
}