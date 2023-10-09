import { Client, Interaction } from 'discord.js';

import chalk from 'chalk';

export const GLOBAL_COMMONJS_FILE_EXTENSION = '.ts';

console.log(chalk.blueBright(`Loading commonjs using extension \'${GLOBAL_COMMONJS_FILE_EXTENSION}\'...`));

export interface ICooldown {
    id: string;
    durationInSeconds: number;
    issuedAtTimestamp: number;
    userId: string;
}

export class Cooldown implements ICooldown {
    public id: ICooldown["id"];
    public durationInSeconds: ICooldown["durationInSeconds"];
    public issuedAtTimestamp: ICooldown["issuedAtTimestamp"];
    public userId: ICooldown["userId"];

    constructor(id: ICooldown["id"], durationInSeconds: ICooldown["durationInSeconds"], issuedAtTimestamp: ICooldown["issuedAtTimestamp"], user: ICooldown["userId"]) {
        this.id = id;
        this.durationInSeconds = durationInSeconds;
        this.issuedAtTimestamp = issuedAtTimestamp;
        this.userId = user;
    }
}

export interface ICommand {
    commandName: string;
    cooldown: number;
    guilds: string[] | null;
    data: {
        commandName: string;
        nameLocalizations: {
            [key: string]: string;
        };
        description: string;
        descriptionLocalizations: {
            [key: string]: string;
        };
        options: {
            name: string;
            nameLocalizations: {
                [key: string]: string;
            };
            description: string;
            descriptionLocalizations: {
                [key: string]: string;
            };
            required: boolean;
            choices: {
                name: string;
                nameLocalizations: {
                    [key: string]: string;
                };
                value: string;
                valueLocalizations: {
                    [key: string]: string;
                };
            }[];
        }[];
    };
    execute(client: ClientData, interaction: Interaction): void;
}

export class Command implements ICommand {

    public commandName: ICommand["commandName"];
    public cooldown: ICommand["cooldown"];
    public data: ICommand["data"];
    public guilds: ICommand["guilds"];
    public execute: ICommand["execute"];

    constructor(cooldown: ICommand["cooldown"], commandName: ICommand["commandName"], data: ICommand["data"], execute: ICommand["execute"], guilds: ICommand["guilds"]) {
        this.cooldown = cooldown;
        this.commandName = commandName;
        this.data = data;
        this.execute = execute;
        this.guilds = guilds;
    }
}

export interface IClientData {
    discordClient: Client;
    commands: Command[];
    cooldowns: Cooldown[]

    setCooldown(): void
    setCommand(): void
}

export class ClientData {
    public discordClient: IClientData["discordClient"];
    public commands: IClientData["commands"];
    public cooldowns: IClientData["cooldowns"];

    constructor(discordClient: IClientData["discordClient"], commands: IClientData["commands"], cooldowns: IClientData["cooldowns"]) {
        this.discordClient = discordClient;
        this.commands = commands;
        this.cooldowns = cooldowns;
    }

    setCooldown(cooldown: Cooldown) {
        this.cooldowns.push(cooldown);
    }

    setCommand(command: Command) {
        this.commands.push(command);
    }
}