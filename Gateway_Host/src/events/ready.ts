import { Events } from 'discord.js';
import { ClientData } from '../resources/structures';
import chalk from 'chalk';

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: ClientData) {
        if (client.discordClient.user === null) return;

        console.log(chalk.greenBright(`Ready! Authenticated as ${client.discordClient.user!.username}`));
    }
}