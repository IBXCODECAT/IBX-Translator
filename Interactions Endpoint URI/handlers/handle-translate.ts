import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, APIMessageApplicationCommandInteraction, APIMessageComponentInteraction, APIMessageComponentSelectMenuInteraction, APIMessageInteraction, MessageFlags } from "discord-api-types/v10";
import { DeferInteractionResponse, EditSlashCommandResponse, InteractionFollowUp, SendFinalSlashCommandResponse } from "../middlewares/discord-interaction";
import { IBXTranslationObject } from "../interfaces/transObj";
import { TranslateContent, TranslateInteractionContent } from "../services/translate";
import { NextApiResponse } from "next";
import { TRANSLATE_THIS_COMPONENTS } from "../resources/message-components";
import GetObjectValueThroughChildOfUnknownName from "../services/unkown-json";

export async function HandleTranslate(interaction: APIChatInputApplicationCommandInteraction, res: NextApiResponse<APIInteractionResponse>)
{
    const { data: { options }, } = interaction as APIChatInputApplicationCommandInteraction

    switch(options![0].name)
    {
        case 'help':
            console.log('help')
            await SendFinalSlashCommandResponse(res, MessageFlags.Ephemeral, 'There will be a help message here someday, and that day is not today...');
            return;

        case 'message':
            await DeferInteractionResponse(interaction, MessageFlags.SuppressNotifications);
            const translation_msg: IBXTranslationObject = await TranslateInteractionContent(options!);
            await EditSlashCommandResponse(interaction, `${translation_msg.translation}`);
            return;
        
        case 'preview':
            await DeferInteractionResponse(interaction, MessageFlags.Ephemeral);
            const translation_preview: IBXTranslationObject = await TranslateInteractionContent(options!);
            await EditSlashCommandResponse(interaction, `${translation_preview.translation}`);
            return;
    }
}

export async function HandleTranslateWithDropdown(interaction: APIMessageApplicationCommandInteraction, res: NextApiResponse<APIInteractionResponse>)
{
    const sourceMessage: IBXDiscordMessage = JSON.parse(JSON.stringify(interaction));
    const messageObject = GetObjectValueThroughChildOfUnknownName(interaction.data.resolved.messages);

    const msg = interaction.message?.content!;

    await SendFinalSlashCommandResponse(res, MessageFlags.Ephemeral, messageObject.content, undefined, TRANSLATE_THIS_COMPONENTS);
    return;
}

export async function HandleTranslateSelection(interaction: APIMessageComponentSelectMenuInteraction, res: NextApiResponse<APIInteractionResponse>)
{
    const { data: { custom_id, values }, } = interaction
    const messageContent = interaction.message?.content!;

    await DeferInteractionResponse(interaction, MessageFlags.Ephemeral);

    const translation_msg: IBXTranslationObject = await TranslateContent(values![0], messageContent);

    await EditSlashCommandResponse(interaction, `${translation_msg.translation}`);
    return;
}