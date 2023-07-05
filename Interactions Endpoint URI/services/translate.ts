import { APIApplicationCommandBasicOption, APIApplicationCommandInteractionDataOption, APIApplicationCommandInteractionDataStringOption, APIApplicationCommandStringOption } from "discord-api-types/v10";
import { IBXTranslationObject as IBXTranslationObject } from "../interfaces/transObj";

const transURI = "https://translation-service-kappa.vercel.app/api/translate?";
export async function TranslateContent(interaction_data: APIApplicationCommandInteractionDataOption[]): Promise<IBXTranslationObject>
{
    const selectedLanguage = interaction_data[0] as APIApplicationCommandInteractionDataStringOption;
    const content = interaction_data[0] as APIApplicationCommandInteractionDataStringOption;

    const response = await fetch(transURI + new URLSearchParams({
        selectedLanguage: selectedLanguage.value,
        content: content.value
    }))

    const translation: IBXTranslationObject = await response.json();

    return translation;
}

export async function TranslationTest(lang: string, text: string): Promise<IBXTranslationObject>
{
    const response = await fetch(transURI + new URLSearchParams({
        selectedLanguage: lang,
        content: text
    }));

    const translation: IBXTranslationObject = await response.json();

    return translation;
}