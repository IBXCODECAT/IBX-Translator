import { APIApplicationCommandBasicOption, APIApplicationCommandInteractionDataOption, APIApplicationCommandInteractionDataStringOption, APIApplicationCommandStringOption } from "discord-api-types/v10";
import { IBXTranslationObject as IBXTranslationObject } from "../interfaces/transObj";

const transURI = "https://translation-service-kappa.vercel.app/api/translate?";
export async function TranslateContent(interaction_data: APIApplicationCommandInteractionDataOption[]): Promise<IBXTranslationObject>
{
    let selectedLanguage = 'en_US';
    let content = 'no content';

    if(interaction_data![0].name === 'message')
    {
          selectedLanguage = (interaction_data![0] as any).options[0].value;
          content = (interaction_data![0] as any).options[1].value;
    }

    console.log(`Selected Language: ${JSON.stringify(selectedLanguage)}`);
    console.log(`Content: ${JSON.stringify(content)}`);

    const response = await fetch(transURI + new URLSearchParams({
        selectedLanguage: selectedLanguage,
        content: content
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