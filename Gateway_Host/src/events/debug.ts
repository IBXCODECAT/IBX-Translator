import { Events } from 'discord.js';
import { ClientData } from '../resources/structures';
import chalk from 'chalk';

export default {
    name: Events.Debug,
    once: false,
    execute(client: ClientData, debug: any) {
        console.warn(chalk.gray(debug));
    }
}