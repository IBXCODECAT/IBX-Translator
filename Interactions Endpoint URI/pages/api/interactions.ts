import { NextApiRequest, NextApiResponse } from "next"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, InteractionResponseType, MessageFlags } from "discord-api-types/v10"
import { withDiscordInteraction } from "../../middlewares/discord-interaction"
import withErrorHandler from "../../middlewares/error-handler";
import { HELP_EMBED } from "../../resources/embeds";
import { INTERACTION_ACK, INTERACTION_ACK_PING, INTERACTION_RESPOND_INSTANTLY } from "../../resources/constants";
import { HandleTranslate } from "../../handlers/handle-translate";


const PRIVATE_COMMAND_RESPONSE_DATA = { tts: false, flags: MessageFlags.Ephemeral }
const PUBLIC_COMMAND_RESPONSE_DATA = { tts: false, flags: 0 }

const CLOSE_INTERACTION = { ...INTERACTION_ACK_PING, data: { ...PRIVATE_COMMAND_RESPONSE_DATA } };

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
  const { data: { name }, } = interaction as APIChatInputApplicationCommandInteraction

  switch (name) {
    case "support":
      return res.status(200).json(COMMAND_SUPPORT_RESPONSE)
    case "help":
      return res.status(200).json(COMMAND_HELP_RESPONSE);
    case "translate":
      await HandleTranslate(interaction as APIChatInputApplicationCommandInteraction, res);
      break;
    default:
      return res.status(404).json(INVALID_COMMAND_RESPONSE)
  }
}

export default withErrorHandler(withDiscordInteraction(handler))