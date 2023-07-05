import { TranslationTest } from "../../../services/translate";

export default async function handler(req: any, res: any) {

    //Verify that the request to this URI was a GET request. If not deny the request (METHOD NOT ALLOWED)
    if(req.method != 'GET') return res.status(405).json( { error: "405 METHOD NOT ALLOWED", reason: 'Invalid request method', method: req.method } )
    
    //Parse and extract the request query parameters
    const { selectedLanguage, content } = req.query;

    //If there are missing query parameters deny the request (BAD REQUEST)
    if(selectedLanguage == undefined || selectedLanguage == "") return res.status(400).json( { error: "400 BAD REQUEST", eason: 'No language specified', params: { selectedLanguage, content } } );
    if(content == undefined || content == "") return res.status(400).json( { error: "400 BAD REQUEST", reason: 'No content provided', params: { selectedLanguage, content } } )    

    const translation = await TranslationTest(selectedLanguage, content);

    return res.status(404).json(translation);
}