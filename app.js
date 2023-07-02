require('dotenv').config();

const { ShardingManager } = require('discord.js');

const shardManager = new ShardingManager('./bot.js', { token: process.env.DISCORD_BOT_TOKEN });

shardManager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

shardManager.spawn();