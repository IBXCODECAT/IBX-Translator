import { MongoClient, Db, ObjectId, MongoClientOptions, ServerApiVersion } from "mongodb";
import { MongoGuildObject } from "../interfaces/MongoObjects";

const connection_uri = process.env.MONGODB_URI!;
const database_name = process.env.MONGODB_DB!;

let dbInstance: Db | null = null;

async function ConnectToMongoDB(): Promise<Db> {
    //If MongoDB is already connected, return the existing connection
    if (dbInstance) return dbInstance;

    console.log('connecting to mongodb...');

    //If MongoDB is not connected, create a new connection
    const client = new MongoClient(connection_uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
         },
         useNewUrlParser: true,
         useUnifiedTopology: true 
    } as MongoClientOptions);

    await client.connect();

    console.log('connected to mongodb');

    return client.db(database_name);
}

export function ConvertNumberIdToObjectID(id: string)
{
    const number = parseInt(id);
    const hexString = number.toString(16);
    const paddedHexString = hexString.padStart(24, '0');
    return paddedHexString;
}

export async function ReadSingleObjectFromDB(collectionName: string, objectId: string): Promise<any> {
    try
    {
        const db = await ConnectToMongoDB();
        const collection = db.collection(collectionName);
        const object = await collection.findOne({ _id: new ObjectId(objectId) });
        console.log('read operation complete')
        return object;
    }
    catch(err)
    {
        console.error(err);
        return null;
    }
}

async function UpdateSingleObjectInDB(collectionName: string, objectId: string, object: any)
{
    try
    {
        const db = await ConnectToMongoDB();
        const collection = db.collection(collectionName);
        const result = await collection.updateOne({ _id: new ObjectId(objectId) }, { $set: object });
        console.log('update operation complete');
        return result;
    }
    catch(err)
    {
        console.error(err);
        return null;
    }
    
}

export async function InsertOrUpdateSingleObjectIntoDB(collectionName: string, object: any): Promise<any> {
    
    if(await ReadSingleObjectFromDB('guilds', object._id) != null)
    {
        UpdateSingleObjectInDB('guilds', object._id, object);
        return;
    }
    
    try
    {
        const db = await ConnectToMongoDB();
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(object);
        console.log('insert operation complete');
        return result;
    }
    catch(err)
    {
        console.error(err);
        return null;
    }
}

export async function DeleteSingleObjectFromDB(collectionName: string, objectId: string)
{
    const db = await ConnectToMongoDB();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(objectId) });
    console.log('delete operation complete')
    return result;
}