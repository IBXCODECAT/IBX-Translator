import { Shard } from "discord.js";

import { config } from "dotenv";

config();

import { ShardingManager } from 'discord.js';


const manager = new ShardingManager(`${process.cwd()}\\src\\bot.ts`, { token: process.env.DISCORD_BOT_TOKEN });
//const manager = new ShardingManager(`${__dirname}\\bot.js`, { token: process.env.DISCORD_BOT_TOKEN });

manager.on('shardCreate', (shard: Shard) => console.log(`Launched shard ${shard.id}`));

manager.spawn();