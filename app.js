
const translate = require('translate-google');

const transObj = {
    d: [true, 'true', 'hi'],
}

x = translate(transObj, { to: 'ru', except:['a']});

console.log(x);

translate(transObj, { to: 'ru', except:['a']}).then(res => {
    console.log(res.d[2]);
}).catch(err => {
    console.error(err);
})


require('dotenv').config();

const { ShardingManager } = require('discord.js');

const shardManager = new ShardingManager('./bot.js', { token: process.env.DISCORD_BOT_TOKEN });

shardManager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

shardManager.spawn();


