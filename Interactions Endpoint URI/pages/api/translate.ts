import { TranslationTest } from "../../services/translations";
import translate from 'google-translate-api';

export default async function handler(req: any, res: any) {
    //const data = await GetDataTest();

    const settings = { from: undefined, to: "ru" }

    //const translation = await TranslationTest("ru", "hello!");
    
    let translation = "null";

    
    await translate("hi", settings).then(translateRes => {
        console.log(translateRes.text);
        translation = translateRes.text;
    })

    
    return res.status(200).json( { data: translation });
    

}

async function GetDataTest(): Promise<string> {
    const res = await fetch("	https://api.adviceslip.com/advice/0");

    return "eggs";
}