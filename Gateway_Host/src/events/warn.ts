import { Events } from 'discord.js';
import { ClientData } from '../structures';
import chalk from 'chalk';

export default {
    name: Events.Warn,
    once: false,
    execute(client: ClientData, warning: any) {

        console.warn(chalk.yellowBright(warning));
    }
}