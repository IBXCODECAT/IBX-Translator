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
                    },
                    {
                        "label": "English",
                        "value": "en",
                        "description": "Translate to English",
                    },
                    {
                        "label": "Español",
                        "value": "es",
                        "description": "Traducir al español",
                    },
                    {
                        "label": "Français",
                        "value": "fr",
                        "description": "Traduire en français",
                    },
                    {
                        "label": "Italiano",
                        "value": "it",
                        "description": "Traduci in italiano",
                    },
                    {
                        "label": "Русский",
                        "value": "ru",
                        "description": "Перевести на русский",
                    },
                    {
                        "label": "中文（中国）",
                        "value": "zh-CN",
                        "description": "翻译成中文（简体）",
                    },
                    {
                        "label": "日本",
                        "value": "ja",
                        "description": "翻译成日语",
                    }
                ]
            }
        ]
    }
];