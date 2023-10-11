import { APIActionRowComponent, APIMessageActionRowComponent, APIMessageComponent, APISelectMenuComponent, APISelectMenuOption, ActionRow, ActionRowBuilder, ActionRowData, Interaction, MessageActionRowComponent, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { ClientData } from "../resources/structures";
import i18next from "i18next";

import { strings } from '../locales/locales';

let language_select: StringSelectMenuBuilder | undefined;

async function InitializeSelectionComponents(locale: string) {
    language_select = new StringSelectMenuBuilder()
        .setCustomId('language-select')
        .setPlaceholder(i18next.t(strings.translateThisLanguageSelectPlaceholder, { lng: locale }))
        .addOptions([
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.german, { lng: locale }))
                .setValue('de'),
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.english_gb, { lng: locale }))
                .setValue('en-GB'),
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.english_us, { lng: locale }))
                .setValue('en-US'),
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.spanish, { lng: locale }))
                .setValue('es-ES'),
            new StringSelectMenuOptionBuilder()
                .setLabel(i18next.t(strings.russian, { lng: locale }))
                .setValue('ru'),
        ]);
}


export async function GetLanguageSelectionComponents(i: Interaction): Promise<ActionRowBuilder<StringSelectMenuBuilder>> {
    await InitializeSelectionComponents(i.locale);

    const action_row: ActionRowBuilder<StringSelectMenuBuilder> = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(language_select!);
    return action_row as ActionRowBuilder<StringSelectMenuBuilder>;
}

export async function execute(client: ClientData, interaction: StringSelectMenuInteraction) {

    await interaction.deferReply({ ephemeral: true });

}