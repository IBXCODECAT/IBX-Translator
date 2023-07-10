import { InteractionResponseType } from "discord-api-types/v10";

export const INTERACTION_ACK_PING = { type: InteractionResponseType.Pong as number };
export const INTERACTION_RESPOND_INSTANTLY = { type: InteractionResponseType.ChannelMessageWithSource as number }
export const INTERACTION_ACK = { type: InteractionResponseType.DeferredChannelMessageWithSource as number }
export const INTERACTION_ACK_WITH_INPUT_MODAL = { type: InteractionResponseType.Modal as number }
export const INTERACTION_EDIT_RESPONSE = { type: InteractionResponseType.UpdateMessage as number }