const translate = require('translate-google');

export default async function handler(req: any, res: any) {
    
    //Verify that the request to this URI was a GET request. If not deny the request (METHOD NOT ALLOWED)
    if(req.method != 'GET') return res.status(405).json( { error: "405 METHOD NOT ALLOWED", reason: 'Invalid request method', method: req.method } )
    
    //Parse and extract the request query parameters
    const { selectedLanguage, content } = req.query;

    //If there are missing query parameters deny the request (BAD REQUEST)
    if(selectedLanguage == undefined || selectedLanguage == "") return res.status(400).json( { error: "400 BAD REQUEST", eason: 'No language specified', params: { selectedLanguage, content } } );
    if(content == undefined || content == "") return res.status(400).json( { error: "400 BAD REQUEST", reason: 'No content provided', params: { selectedLanguage, content } } )

    //Replace all non alphanumeric characters with nothing
    let textToTranslate = content.replace(/[^a-zA-Z0-9\s.!?]/g, '');
    
    //Construct our translation object
    const transObj = { d: [true, 'true', textToTranslate] }
    
    let result;

    //Translate the specified input
    try
    {
        result = await translate(transObj, { to: selectedLanguage, except:['a']});
    }
    catch
    {
        return res.status(501).json( { error: '501 NOT IMPLEMENTED ', reason: 'The server does not support this request', params: { selectedLanguage, content } } )
    }
    
    
    //Return the translated result (200 OK)
    return res.status(200).json( { translation: result.d[2], data: [ result.a, result.b, result.c, result.d[0], result.d[1]] });
}