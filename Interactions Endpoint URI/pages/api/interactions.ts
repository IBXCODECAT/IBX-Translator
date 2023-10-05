import { NextApiRequest, NextApiResponse } from "next"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, APIMessageApplicationCommandInteraction, APIMessageComponentInteraction, APIMessageComponentSelectMenuInteraction, MessageFlags } from "discord-api-types/v10"
import { SendFinalSlashCommandResponse as CompleteSlashCommandExecution, withDiscordInteraction } from "../../middlewares/discord-interaction"
import withErrorHandler from "../../middlewares/error-handler";
import { HELP_EMBED } from "../../resources/embeds";
import { INTERACTION_RESPOND_INSTANTLY } from "../../resources/constants";
import { HandleTranslate, HandleTranslateSelection, HandleTranslateWithDropdown } from "../../handlers/handle-translate";
import { isChatInputApplicationCommandInteraction, isContextMenuApplicationCommandInteraction, isMessageComponentSelectMenuInteraction } from "discord-api-types/utils/v10";

const INVALID_COMMAND_RESPONSE = { ...INTERACTION_RESPOND_INSTANTLY, data: { flags: MessageFlags.Ephemeral, content: "You have executed a command that does not exist in my directory. Try again later or run **/support** to contact the developers." } }

// disable body parsing, need the raw body as per https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
export const config = {
  api: {
    bodyParser: false,
  },
}

// Define the handler function that handles interactions
const handler = async (
  _: NextApiRequest, // Ignore the request object as it's not used
  res: NextApiResponse<APIInteractionResponse>, // Response object to send a response
  interaction: APIApplicationCommandInteraction | APIMessageComponentInteraction // The received interaction object
) => {
  // Check if the interaction is a chat input application command
  if (isChatInputApplicationCommandInteraction(interaction as APIApplicationCommandInteraction)) {
    interaction = interaction as APIChatInputApplicationCommandInteraction;

    // Extract the 'name' property from the interaction data
    const { data: { name } } = interaction;

    // Handle different interaction commands based on their names
    switch (name) {
      case "support":
        // Execute 'support' command and respond with an ephemeral message containing a link
        return await CompleteSlashCommandExecution(res, MessageFlags.Ephemeral, "https://discord.gg/Zy5uXQUZXx");
      case "help":
        // Execute 'help' command and respond with a message with suppressed notifications and an embedded help message
        return await CompleteSlashCommandExecution(res, MessageFlags.SuppressNotifications, "", HELP_EMBED);
      case "invite":
        // Execute 'invite' command and respond with a message containing a link with supressed notifications
        return await CompleteSlashCommandExecution(res, MessageFlags.SuppressEmbeds, `[Click to Invite IBX Translator🌐 to your server!](https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=0&scope=bot%20applications.commands)`);
      case "translate":
        // Execute 'translate' command and call the 'HandleTranslate' function
        return await HandleTranslate(interaction as APIChatInputApplicationCommandInteraction, res);
      default:
        // Log unknown interactions and return a 404 JSON response
        console.log(JSON.stringify(interaction));
        return res.status(404).json(INVALID_COMMAND_RESPONSE);
    }
  }
  // Check if the interaction is a context menu application command
  else if (isContextMenuApplicationCommandInteraction(interaction as APIApplicationCommandInteraction)) {
    interaction = interaction as APIMessageApplicationCommandInteraction;

    // Extract the 'name' property from the interaction data
    const { data: { name } } = interaction;

    // Handle different context menu interactions based on their names
    switch (name) {
      case "Translate This!":
        // Execute 'Translate This!' command with a dropdown menu
        return await HandleTranslateWithDropdown(interaction as APIMessageApplicationCommandInteraction, res);
      default:
        // Log unknown interactions and return a 404 JSON response
        console.log(JSON.stringify(interaction));
        return res.status(404).json(INVALID_COMMAND_RESPONSE);
    }
  }
  // Check if the interaction is a message component select menu interaction
  else if (isMessageComponentSelectMenuInteraction(interaction as APIMessageComponentInteraction)) {
    // Execute 'HandleTranslateSelection' for select menu interactions
    return await HandleTranslateSelection(interaction as APIMessageComponentSelectMenuInteraction, res);
  }
};

// Export the handler function with error handling and Discord interaction middleware
export default withErrorHandler(withDiscordInteraction(handler));
