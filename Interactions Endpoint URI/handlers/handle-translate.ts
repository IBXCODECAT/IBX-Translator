import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, APIMessageApplicationCommandInteraction, APIMessageComponentInteraction, APIMessageComponentSelectMenuInteraction, APIMessageInteraction, MessageFlags } from "discord-api-types/v10";
import { DeferInteractionResponse, EditSlashCommandResponse, InteractionFollowUp, SendFinalSlashCommandResponse } from "../middlewares/discord-interaction";
import { NextApiResponse } from "next";
import { TRANSLATE_THIS_COMPONENTS } from "../resources/message-components";
import GetObjectValueThroughChildOfUnknownName from "../services/unkown-json";
import { translate } from 'free-translate';
import { Locale } from 'free-translate/dist/types/locales';

export async function HandleTranslate(interaction: APIChatInputApplicationCommandInteraction, res: NextApiResponse<APIInteractionResponse>) {
    try {
        const { data: { options }, } = interaction as APIChatInputApplicationCommandInteraction

        console.log(options);

        let ephemeral: boolean = false;
        const ephemeralOption = options![2];

        if (ephemeralOption !== undefined) {
            ephemeral = (ephemeralOption as any).value;
        }

        //Supress notifications in public message or mark as private message
        const flags = !ephemeral ? MessageFlags.Ephemeral : MessageFlags.SuppressNotifications;

        await DeferInteractionResponse(interaction, flags);

        const content = (options![0] as any).value;
        const selectedLanguageCode = (options![1] as any).value;

        const trenslation = await translate(content, { from: interaction.locale as Locale | 'auto', to: selectedLanguageCode });

        console.log(trenslation);
        
        await EditSlashCommandResponse(interaction, `${trenslation}`);
    }
    catch (err) {
        console.error(err);
    }

    return;
}

export async function HandleTranslateWithDropdown(interaction: APIMessageApplicationCommandInteraction, res: NextApiResponse<APIInteractionResponse>) {

    try {
        const messageObject = GetObjectValueThroughChildOfUnknownName(interaction.data.resolved.messages);

        const msg = messageObject.content;

        await SendFinalSlashCommandResponse(res, MessageFlags.Ephemeral, msg, undefined, TRANSLATE_THIS_COMPONENTS);
        return;
    }
    catch (err) {
        console.error(err);
    }
}

export async function HandleTranslateSelection(interaction: APIMessageComponentSelectMenuInteraction, res: NextApiResponse<APIInteractionResponse>) {
    const { data: { custom_id, values }, } = interaction
    const messageContent = interaction.message?.content!;

    await DeferInteractionResponse(interaction, MessageFlags.Ephemeral);

    const translation = await translate(messageContent, { from: "auto", to: values[0]! as Locale });

    await EditSlashCommandResponse(interaction, `${translation}`);
    return;
}