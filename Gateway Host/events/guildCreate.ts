import { Client, Events, Guild } from 'discord.js';

module.exports = {
	name: Events.GuildCreate,
	async execute(client: Client, guild: Guild) {
        console.log(`Joined guild: ${guild.name} (${guild.id})`);

        const promises = [
            client.shard!.fetchClientValues('guilds.cache.size'),
            client.shard!.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];

        Promise.all(promises)
            .then( async results => {
                const totalGuilds = results[0].reduce((acc, guildCount: any) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount: any) => acc + memberCount, 0);
				
                const DBL_FetchOptions = {
                    method: 'POST',
                    headers: { 'Authorization': `Bot ${process.env.DBL_TOKEN}` },
                    body: JSON.stringify({ guilds: totalGuilds })
                }

                const TOPGG_FetchOptions = {
                    method: 'POST',
                    headers: { 'Authorization': `${process.env.TOPGG_TOKEN}` },
                    body: JSON.stringify({ server_count: totalGuilds })
                }

                const CLIENT_ID = process.env.CLIENT_ID;

                const DBL_Response = await fetch(`https://discordbotlist.com/api/v1/bots/${CLIENT_ID}/stats`, DBL_FetchOptions)
                const TOPGG_Response = await fetch(`https://top.gg/api/bots/${CLIENT_ID}/stats`, TOPGG_FetchOptions);

                if(DBL_Response.ok && TOPGG_Response.ok)
                {
                    console.log(`Successfully posted guild count to DBL and Top.gg!`);
                }
                else
                {
                    console.log(`Failed to post guild count to DBL and/or Top.gg!`);
                }

				client.user!.setActivity(`Connecting over ${totalMembers} people in ${totalGuilds} servers!`);
            })
            .catch(console.error);
	},
};