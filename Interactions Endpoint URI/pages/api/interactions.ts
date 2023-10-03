import { NextApiRequest, NextApiResponse } from "next"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, APIMessageApplicationCommandInteraction, APIMessageInteraction, InteractionResponseType, MessageFlags } from "discord-api-types/v10"
import { SendFinalSlashCommandResponse as CompleteSlashCommandExecution, withDiscordInteraction } from "../../middlewares/discord-interaction"
import withErrorHandler from "../../middlewares/error-handler";
import { HELP_EMBED } from "../../resources/embeds";
import { INTERACTION_RESPOND_INSTANTLY } from "../../resources/constants";
import { HandleTranslate, HandleTranslateWithButtons } from "../../handlers/handle-translate";

const INVALID_COMMAND_RESPONSE = { ...INTERACTION_RESPOND_INSTANTLY, data: { flags: MessageFlags.Ephemeral, content: "You have executed a command that does not exist in my directory. Try again later or run **/support** to contact the developers." } }

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
  const { data: { name }, } = interaction
  switch (name) {
    case "support":
      return await CompleteSlashCommandExecution(res, MessageFlags.Ephemeral, "https://discord.gg/Zy5uXQUZXx")
    case "help":
      return await CompleteSlashCommandExecution(res, MessageFlags.SuppressNotifications, "", HELP_EMBED)
    case "translate":
      return await HandleTranslate(interaction as APIChatInputApplicationCommandInteraction, res);
    case "Translate This!":
      return await HandleTranslateWithButtons(interaction as APIMessageApplicationCommandInteraction, res);
    default:
      return res.status(404).json(INVALID_COMMAND_RESPONSE)
  }
}

export default withErrorHandler(withDiscordInteraction(handler))