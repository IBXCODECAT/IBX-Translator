export interface ICommand {
    cooldown: number;
    guilds: string[] | null;
    data: {
        name: string;
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
    execute(): void;
}

export interface ICooldown {
    id: string;
    durationInSeconds: number;
    issuedAtTimestamp: number;
}