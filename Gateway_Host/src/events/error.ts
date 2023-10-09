import { Events } from 'discord.js';
import { ClientData } from '../resources/structures';
import chalk from 'chalk';

export default {
    name: Events.Error,
    once: false,
    execute(client: ClientData, error: any) {

        console.error(chalk.redBright(error));
    }
}