export const TRANSLATE_THIS_COMPONENTS =
    [
        {
            "type": 1, //Action Row container for ui components (Required)
            "components":
                [
                    {
                        "type": 3, //String select see https://discord.com/developers/docs/interactions/message-components
                        "custom_id": "translate_this_selection",
                        "options":
                            [
                                {
                                    "label": "Deutsch",
                                    "value": "de",
                                    "description": "Ins Deutsche übersetzen",
                                    "emoji": {
                                        "name": "🇩🇪"
                                    }
                                },
                                {
                                    "label": "English",
                                    "value": "en-GB",
                                    "description": "Translate to English",
                                    "emoji": {
                                        "name": "🇬🇧"
                                    }
                                },
                                {
                                    "label": "English",
                                    "value": "en-US",
                                    "description": "Translate to English",
                                    "emoji": {
                                        "name": "🇺🇸"
                                    }
                                },
                                {
                                    "label": "Español",
                                    "value": "es",
                                    "description": "Traducir al español",
                                    "emoji": {
                                        "name": "🇪🇸"
                                    }
                                },
                                {
                                    "label": "Русский",
                                    "value": "ru",
                                    "description": "Перевести на русский",
                                    "emoji": {
                                        "name": "🇷🇺"
                                    }
                                }
                            ]
                    }
                ]
        }
    ];