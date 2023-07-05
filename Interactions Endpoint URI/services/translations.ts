import { APIApplicationCommandInteractionDataOption, APIApplicationCommandInteractionDataStringOption, APIApplicationCommandOption, APIApplicationCommandOptionBase } from "discord-api-types/v10"
import translate from 'google-translate-api';

interface TranslateOption {
    from?: string | undefined;
    to?: string | undefined;
    raw?: boolean | undefined;
}

export async function TranslateTextWithDiscordCommandOptions(data: APIApplicationCommandInteractionDataOption[]): Promise<string>
{
    const language = (data[0] as APIApplicationCommandInteractionDataStringOption).value;
    const content = (data[1] as APIApplicationCommandInteractionDataStringOption).value;
    
    const settings: TranslateOption = { from: undefined, to: language }
    
    let result = "null";

    await translate(content, settings).then(response => {
        result = response.text;
    });

    return result;
}

export async function TranslationTest(language: string, content: string): Promise<string>
{   
    const settings: TranslateOption = { from: undefined, to: language }
    
    translate(content, settings).then(res =>
    {
            console.log(res);
    }).catch(err =>
    {
            console.error(err);
    })

    let result = "null";

    return new Promise(function(resolve, reject) {
        translate(content, settings).then(res => {
            resolve(res.text);
        })
        
    });    
}