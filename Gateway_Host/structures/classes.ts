import { Client, IconData } from 'discord.js';
import { ICommand, ICooldown } from './interfaces';

export class ClientData {

    public discordClient;
    public commands : Command[];
    public cooldowns : ICooldown[];

    constructor(discordClient: Client, commands: Command[], cooldowns: ICooldown[]) {
        this.discordClient = discordClient;
        this.commands = commands;
        this.cooldowns = cooldowns;
    }

    setCooldown(cooldown: ICooldown) {
        this.cooldowns.push(cooldown);
    }

    setCommand(command: Command) {
        this.commands.push(command);
    }
}

export class Command implements ICommand {

    public cooldown: ICommand["cooldown"];
    public data: ICommand["data"];
    public guilds: ICommand["guilds"];
    public execute: ICommand["execute"];

    constructor(cooldown: ICommand["cooldown"], data: ICommand["data"], execute: ICommand["execute"], guilds: ICommand["guilds"]) {
        this.cooldown = cooldown;
        this.data = data;
        this.execute = execute;
        this.guilds = guilds;
    }
}