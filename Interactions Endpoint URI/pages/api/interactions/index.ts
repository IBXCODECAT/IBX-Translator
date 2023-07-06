import { NextApiRequest, NextApiResponse } from "next"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, InteractionResponseType, MessageFlags } from "discord-api-types/v10"
import withDiscordInteraction from "./../../../middlewares/discord-interaction"
import withErrorHandler from "./../../../middlewares/error-handler"
import { TranslateContent } from "../../../services/translate";
import { IBXTranslationObject as IBXTranslationObject } from "../../../interfaces/transObj";

const INTERACTION_ACK_PING = { type: InteractionResponseType.Pong as number };
const INTERACTION_RESPOND_INSTANTLY = { type: InteractionResponseType.ChannelMessageWithSource as number }
const INTERACTION_ACK = { type: InteractionResponseType.DeferredChannelMessageWithSource as number }
const INTERACTION_RESPOND_LATE = { type: InteractionResponseType.DeferredMessageUpdate as number }
const INTERACTION_ACK_WITH_INPUT_MODAL = { type: InteractionResponseType.Modal as number }

const COMMAND_RESPONSE_DATA = { tts: false, flags: MessageFlags.Ephemeral }

const ACK_INTERACTION = { ...INTERACTION_ACK, data: { ...COMMAND_RESPONSE_DATA } };

const INVALID_COMMAND_RESPONSE = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: "You have executed a command that does not exist in my directory. Try again later or run **/support** to contact the developers." } }

const COMMAND_SUPPORT_RESPONSE = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: "https://discord.gg/Zy5uXQUZXx" }}


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
      return res.status(200).json(COMMAND_SUPPORT_RESPONSE);
    case "translate":
      try
      {
        console.log(options![0].name);

        switch(options![0].name)
        {
          case 'help':
            const response_help = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: 'There will be a help message here someday, and that day is not today...' } }
            return res.status(200).json(response_help);
          case 'message':
            const translation_msg: IBXTranslationObject = await TranslateContent(options!)
            const ans_msg = translation_msg.translation;
            const response_msg = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: `Here is a preview of your translated message:\n\n\`${ans_msg}\`\n\nA message will be sent in this channel shortly...` }}

            //SEND A MESSAGE IN THE EXECUTION CHANNEL HERE!!!

            return res.status(200).json(response_msg);
          case 'preview':
            const translation_preview: IBXTranslationObject = await TranslateContent(options!)
            const ans_preview = translation_preview.translation;
            const response_preview = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: `Here is a translation:\n\n\`${ans_preview}\`.\n\nA message will not be sent!` }}
            return res.status(200).json(response_preview);
          default:
            return res.status(400);
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