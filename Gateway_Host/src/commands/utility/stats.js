const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
    guilds: null,
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Get statistics for IBXCODEBOT'),
	async execute(interaction) {
		
        const promises = [
            interaction.client.shard.fetchClientValues('guilds.cache.size'),
            interaction.client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];

        return Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
				return interaction.reply({
                    content: `I have joined ${totalGuilds} servers and am helping over ${totalMembers} Dicsord users!`,
                    ephemeral: true
                });
            })
            .catch(console.error);
	},
};

