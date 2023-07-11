export interface MongoGuildObject
{
    guildId: string,
    prenium: boolean,
    translator_primary_channel: MongoTranslatedChannelObject,
    translator_secondary_channel: MongoChannelSyncObject
}

export interface MongoChannelSyncObject
{
    syncs: MongoTranslatedChannelObject[]
}

export interface MongoTranslatedChannelObject
{
    channelId: string,
    language: string
}