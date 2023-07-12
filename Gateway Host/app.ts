import { ShardingManager } from "discord.js";
import { config } from "dotenv";

config();

let manager: ShardingManager;

console.log(process.cwd());

//if(__dirname.endsWith('.ts'))
//{
    manager = new ShardingManager('./bot.ts', { token: process.env.DISCORD_BOT_TOKEN });
//}
//else
//{
    //manager = new ShardingManager('./bot.js', { token: process.env.DISCORD_BOT_TOKEN })
//}

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();