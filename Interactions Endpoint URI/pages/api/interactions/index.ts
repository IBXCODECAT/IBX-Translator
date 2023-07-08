import { NextApiRequest, NextApiResponse } from "next"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, InteractionResponseType, MessageFlags } from "discord-api-types/v10"
import { DeferSlashCommandResponse, EditSlashCommandResponse, withDiscordInteraction } from "./../../../middlewares/discord-interaction"
import withErrorHandler from "./../../../middlewares/error-handler"
import { TranslateContent } from "../../../services/translate";
import { IBXTranslationObject as IBXTranslationObject } from "../../../interfaces/transObj";
import { HELP_EMBED } from "../../../resources/embeds";
import { NextResponse } from "next/server";

const INTERACTION_ACK_PING = { type: InteractionResponseType.Pong as number };
const INTERACTION_RESPOND_INSTANTLY = { type: InteractionResponseType.ChannelMessageWithSource as number }
const INTERACTION_ACK = { type: InteractionResponseType.DeferredChannelMessageWithSource as number }
const INTERACTION_ACK_WITH_INPUT_MODAL = { type: InteractionResponseType.Modal as number }
const INTERACTION_EDIT_RESPONSE = { type: InteractionResponseType.UpdateMessage as number }

const PRIVATE_COMMAND_RESPONSE_DATA = { tts: false, flags: MessageFlags.Ephemeral }
const PUBLIC_COMMAND_RESPONSE_DATA = { tts: false, flags: 0 }

const ACK_INTERACTION = { ...INTERACTION_ACK, data: { ...PRIVATE_COMMAND_RESPONSE_DATA } };

const INVALID_COMMAND_RESPONSE = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...PRIVATE_COMMAND_RESPONSE_DATA, content: "You have executed a command that does not exist in my directory. Try again later or run **/support** to contact the developers." } }

const COMMAND_SUPPORT_RESPONSE = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...PRIVATE_COMMAND_RESPONSE_DATA, content: "https://discord.gg/Zy5uXQUZXx" }}

const COMMAND_HELP_RESPONSE = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...PUBLIC_COMMAND_RESPONSE_DATA, embeds: HELP_EMBED }}

// disable body parsing, need the raw body as per https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
export const config = {
  api: {
    bodyParser: false,
  },
}

//THIS IS THE COMMAND HANDLER I THINK
const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<APIInteractionResponse>,
  interaction: APIApplicationCommandInteraction
) => {
  const { data: { name, options }, } = interaction as APIChatInputApplicationCommandInteraction

  switch (name) {
    case "support":
      return res.status(200).json(COMMAND_SUPPORT_RESPONSE)
    case "help":
      return res.status(200).json(COMMAND_HELP_RESPONSE);
    case "translate":
      try
      {
        console.log(options![0].name);

        switch(options![0].name)
        {
          case 'help':
            const response_help = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...PRIVATE_COMMAND_RESPONSE_DATA, content: 'There will be a help message here someday, and that day is not today...' } }
            return res.status(200).json(response_help);
          
          case 'message':
            await DeferSlashCommandResponse(interaction, MessageFlags.SuppressEmbeds);
            const translation_msg: IBXTranslationObject = await TranslateContent(options!);
            await EditSlashCommandResponse(interaction, `**<@${interaction.member?.user.id}> says:** \`${translation_msg.translation}\``);
            return res.status(200).json(ACK_INTERACTION);
          
          case 'preview':
            await DeferSlashCommandResponse(interaction, MessageFlags.Ephemeral);
            const translation_preview: IBXTranslationObject = await TranslateContent(options!);
            await EditSlashCommandResponse(interaction, `Here is a translation:\n\n\`${translation_preview.translation}\`.\n\nA message will not be sent!`)
            return res.status(200).json(ACK_INTERACTION);

          default:
            return res.status(404).json(INVALID_COMMAND_RESPONSE);
        }
      }
      catch(err)
      {
        console.error(err);
      }
    default:
      return res.status(404).json(INVALID_COMMAND_RESPONSE)
  }
}

export default withErrorHandler(withDiscordInteraction(handler))