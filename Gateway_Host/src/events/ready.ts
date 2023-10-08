import { Events } from 'discord.js';
import { ClientData } from '../structures';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: ClientData) {

        if (client.discordClient.user === null) return;
        if (client.discordClient.shard === null) return;

        console.log(`Ready! Authenticated in as ${client.discordClient.user!.username}`);
    }
}