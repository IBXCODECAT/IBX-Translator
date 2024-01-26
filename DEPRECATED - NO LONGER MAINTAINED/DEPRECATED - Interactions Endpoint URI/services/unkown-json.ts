export default function GetObjectValueThroughChildOfUnknownName(jsonObject: { [key: string]: any }) {
    //Foreach Required for proprety extraction
    for (const property in jsonObject) {
        const value = jsonObject[property];
        return value;
    }
}