// Define TypeScript interfaces to represent the JSON structure
interface IBXDiscordMessage {
    data: {
        id: string;
        name: string;
        resolved: {
            messages: Record<string, IBXDiscordMessageInfo>;
        };
        type: number;
    };
}

interface IBXDiscordMessageInfo {
    content: string;
    // Add other properties you may need here
}