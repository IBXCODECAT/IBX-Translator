import { APIChatInputApplicationCommandInteraction, APIInteractionResponse, MessageFlags } from "discord-api-types/v10";
import { DeferSlashCommandResponse, EditSlashCommandResponse, SendSlashCommandResponse } from "../middlewares/discord-interaction";
import { IBXTranslationObject } from "../interfaces/transObj";
import { TranslateContent } from "../services/translate";
import { NextApiResponse } from "next";

export async function HandleTranslate(interaction: APIChatInputApplicationCommandInteraction, res: NextApiResponse<APIInteractionResponse>)
{
    const { data: { options }, } = interaction as APIChatInputApplicationCommandInteraction

    switch(options![0].name)
    {
        case 'help':
            console.log('help')
            await SendSlashCommandResponse(res, MessageFlags.Ephemeral, 'There will be a help message here someday, and that day is not today...');
            return;

        case 'message':
            await DeferSlashCommandResponse(interaction, MessageFlags.SuppressNotifications);
            const translation_msg: IBXTranslationObject = await TranslateContent(options!);
            await EditSlashCommandResponse(interaction, `${translation_msg.translation}`);
            return;
        
        case 'preview':
            await DeferSlashCommandResponse(interaction, MessageFlags.Ephemeral);
            const translation_preview: IBXTranslationObject = await TranslateContent(options!);
            await EditSlashCommandResponse(interaction, `${translation_preview.translation}`);
            return;
    }
}