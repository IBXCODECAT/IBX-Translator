import { APIApplication, APIApplicationCommandInteraction, APIInteraction, APIInteractionResponse, InteractionResponseType, InteractionType, MessageFlags, Permissions } from "discord-api-types/v10"
import { DiscordInteractionApiHandler } from "./../interfaces/discord"
import { NextApiRequest, NextApiResponse } from "next"
import nacl from "tweetnacl"
import { parseRawBodyAsString } from "../handlers/body-parser"
import { INTERACTION_ACK, INTERACTION_RESPOND_INSTANTLY } from "../resources/constants"
import { isMessageComponentSelectMenuInteraction } from "discord-api-types/utils/v10"

// Your public key can be found on your application in the Developer Portal
const DISCORD_APP_PUBLIC_KEY = process.env.DISCORD_APP_PUBLIC_KEY
const DISCORD_APP_ID = process.env.CLIENT_ID;

if (!DISCORD_APP_PUBLIC_KEY) {
  throw new Error("Environment variables not configured correctly")
}

export type VerifyHeadersArgs = {
  timestamp: string
  rawBody: string
  signature: string
}

/**
 * Verifies the headers sent from Discord according to
 * https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
 */
export const verifyHeaders = ({ timestamp, rawBody, signature }: VerifyHeadersArgs) => {
  return nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, "hex"),
    Buffer.from(DISCORD_APP_PUBLIC_KEY, "hex")
  )
}

/**
 * Middleware to verify the validity of the incoming webhook request according to https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
 * When using this middleware, your API route handler must disable body parsing
 */
export const withDiscordInteraction = (next: DiscordInteractionApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const signature = req.headers["x-signature-ed25519"]
  const timestamp = req.headers["x-signature-timestamp"]
  if (typeof signature !== "string" || typeof timestamp !== "string") {
    return res.status(401).end("invalid request signature")
  }

  try {
    const rawBody = await parseRawBodyAsString(req)
    const isVerified = verifyHeaders({ timestamp, rawBody, signature })
    if (!isVerified) {
      return res.status(401).end("invalid request signature")
    }

    // Parse the message as JSON
    const interaction: APIApplicationCommandInteraction = JSON.parse(rawBody)
    const { type } = interaction

    //@ts-ignore
    if (type === InteractionType.Ping) {
      // PING message, respond with ACK (part of Discord's security and authorization protocol)
      return res.status(200).json({ type: 1 })
    } else {
      return await next(req, res, interaction)
    }
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: "Oops, something went wrong parsing the request!",
    })
  }
}


export async function DeferInteractionResponse(interaction: APIInteraction, message_flags: MessageFlags)
{
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...INTERACTION_ACK, data: { flags: message_flags } })
  };

  console.log(`Request: ${JSON.stringify(fetchOptions)}`);

  const response = await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, fetchOptions);

  console.log(`Response: ${JSON.stringify(response)}\nStatus: ${response.status}`);
}

export async function EditSlashCommandResponse(interaction: APIInteraction, message_content: string, message_embeds?: any[]) {
  const fetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message_content, embeds: message_embeds })
    //body: JSON.stringify({ ...INTERACTION_EDIT_RESPONSE, data: { tts: false, content: payload, embeds: message_embeds } })
  }

  console.log(`Request: ${JSON.stringify(fetchOptions)}`);
  
  const response = await fetch(`https://discord.com/api/v10/webhooks/${DISCORD_APP_ID}/${interaction.token}/messages/@original`, fetchOptions);

  console.log(`Response: ${JSON.stringify(response)}\nStatus: ${response.status}`);
}

export async function InteractionFollowUp(interaction: APIInteraction, message_flags: MessageFlags, message_content: string, message_embeds?: any[], message_components?: any[]) {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message_content, embeds: message_embeds, components: message_components, data: { flags: message_flags } })
  }

  const response = await fetch(`https://discord.com/api/v10/webhooks/${DISCORD_APP_ID}/${interaction.token}`, fetchOptions);
  console.log(`Response: ${JSON.stringify(response)}\nStatus: ${response.status}`);
}

export async function SendFinalSlashCommandResponse(response: NextApiResponse<APIInteractionResponse>, flags: MessageFlags, message_content: string, message_embeds?: any[], message_components?: any[]) {
  response.status(200).json({ ...INTERACTION_RESPOND_INSTANTLY, data: { tts: false, flags: flags, content: message_content, embeds: message_embeds, components: message_components } });
}