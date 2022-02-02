const Discord = require("discord.js");

module.exports = class {

	constructor (client) {
		this.client = client;
	}
    
	async run (guild) {
        
		await guild.members.fetch();

		const guildOwner = await this.client.users.fetch(guild.ownerID).catch(() => {});

		const userData = await this.client.findOrCreateUser({ id: guild.ownerID });
		if(!userData.achievements.invite.achieved){
			userData.achievements.invite.progress.now += 1;
			userData.achievements.invite.achieved = true;
			/*messageOptions.files = [
				{
					name: "unlocked.png",
					attachment: "./assets/img/achievements/achievement_unlocked7.png"
				}
      ];*/
			userData.markModified("achievements.invite");
			await userData.save();
    }

    const messageOptions = new Discord.MessageEmbed()
			.setAuthor("Thank you for adding me to "+guild.name+"!", guild.iconURL())
			.setDescription("Here is some useful information:")
      .addField("**Getting Started**", "You can use the [dashboard](https://dashboard.plutoro.com) to change settings or view the [documentation](https://docs.plutoro.com) for more help! To configure me, type `"+this.client.config.prefix+"help` and look at the administration commands!\nTo change the language, type `"+this.client.config.prefix+"setlang [language]`.")
      .addField("**Support**", "If you need more help, or want to chat with the developers, join our [support server](https://discord.gg/tKRZTJPrcH).")
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer)
      .setThumbnail(this.client.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setTimestamp();

    if (guild.systemChannel) {
            guild.systemChannel.send({ embeds: [messageOptions] }).catch(() => {});
        }
		//guildOwner.send({ embeds: [messageOptions] }).catch(() => {});

		const text = " **"+guild.name+"**, with **"+guild.members.cache.filter((m) => !m.user.bot).size+"** members (and "+guild.members.cache.filter((m) => m.user.bot).size+" bots)";

		// Sends log embed in the logs channel
		const logsEmbed = new Discord.MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
      .setTitle('Joined Server')
			.setColor("#007FFF")
			.setDescription(`> **Guild ID:** ${guild.id}\n> **Members:** ${guild.members.cache.filter((m) => !m.user.bot).size}\n> **Bots:** ${guild.members.cache.filter((m) => m.user.bot).size}\n**Current Servers:** \`${this.client.guilds.cache.size}\``);
		this.client.channels.cache.get(this.client.config.support.logs).send({ embeds: [logsEmbed] });
        
	}
};  