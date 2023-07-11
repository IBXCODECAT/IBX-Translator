import { APIChatInputApplicationCommandInteraction, APIInteractionResponse, MessageFlags } from "discord-api-types/v10";
import { NextApiResponse } from "next";
import { DeferSlashCommandResponse, EditSlashCommandResponse, SendFinalSlashCommandResponse } from "../middlewares/discord-interaction";
import { ConvertNumberIdToObjectID, DeleteSingleObjectFromDB, InsertOrUpdateSingleObjectIntoDB } from "../services/mongoose";
import { ObjectId } from 'mongodb';

export async function HandleConfig(interaction: APIChatInputApplicationCommandInteraction, res: NextApiResponse<APIInteractionResponse>)
{
    const { data: { options }, } = interaction as any

    const guild_id: string = interaction.guild_id!;
    const guild_object_id: string = ConvertNumberIdToObjectID(guild_id);
    
    console.log(guild_object_id);

    const subcommandGroupName = options![0].name;
    const subcommandName = options![0].options![0].name;

    const subcommandOption0 = options![0].options![0].options![0];
    const subcommandOption1 = options![0].options![0].options![1];

    console.log(subcommandName);

    if(subcommandGroupName === 'channel-sync')
    {
        switch(subcommandName)
        {
            case 'help':
                await SendFinalSlashCommandResponse(res, MessageFlags.Ephemeral, 'There will be a help message here someday, and that day is not today...');
                return;

            case 'set-primary-channel':
                await DeferSlashCommandResponse(interaction, MessageFlags.Ephemeral);
                await InsertOrUpdateSingleObjectIntoDB('guilds', { _id: new ObjectId(guild_object_id), guildId: guild_id, translator_primary_channel: { channelId: subcommandOption0.value, language: subcommandOption1.value } })
                await EditSlashCommandResponse(interaction, `Primary channel set to <#${subcommandOption0.value}>`);
                return;

            case 'create-sync':
                
                return;
            
            case 'delete-sync':

                return;
        }
    }
}