const Discord = require("discord.js");

module.exports = class {

	constructor (client) {
		this.client = client;
	}
    
	async run (guild) {
        
		const text = "Someone kicked me out **"+guild.name+"** with **"+guild.members.cache.filter((m) => !m.user.bot).size+"** members (and "+guild.members.cache.filter((m) => m.user.bot).size+" bots)";

		// Sends log embed in the logs channel
		const logsEmbed = new Discord.MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
      .setTitle('Left Server')
			.setColor("#007FFF")
			.setDescription(`> **Guild ID:** ${guild.id}\n**Current Servers:** \`${this.client.guilds.cache.size}\``);
		this.client.channels.cache.get(this.client.config.support.logs).send({ embeds: [logsEmbed] });

	}
};  