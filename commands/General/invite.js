const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Invite extends Command {

	constructor (client) {
		super(client, {
			name: "invite",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "i", "add", "vote", "website", "web", "dashboard", "dash" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {

		const inviteLink = this.client.config.inviteURL || `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`;
		const voteURL = this.client.config.voteURL || `https://top.gg/bot/${this.client.user.id}/vote`;
		const supportURL = `https://www.plutoro.com/support`;
    const websiteURL = `https://www.plutoro.com`;
    const dashboardURL = `https://dashboard.plutoro.com`;

		if(args[0] && args[0] === "copy"){
			return message.channel.send(inviteLink);
		}
        
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.translate("general/invite:LINKS"))
			.setDescription(message.translate("general/invite:TIP", {
				prefix: data.guild.prefix
			}))
			.addField(message.translate("general/invite:ADD"), inviteLink)
			.addField(message.translate("general/invite:VOTE"), voteURL)
			.addField(message.translate("general/invite:SUPPORT"), supportURL)
      .addField(message.translate("general/invite:DASHBOARD"), dashboardURL)
      .addField(message.translate("general/invite:WEBSITE"), websiteURL)
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
        
		message.channel.send({ embeds: [embed] });
           
	}

}

module.exports = Invite;