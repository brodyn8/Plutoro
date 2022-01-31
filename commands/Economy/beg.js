const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Beg extends Command {

	constructor (client) {
		super(client, {
			name: "beg",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000
		});
	}

	async run (message, args, data) {


		const embed = new Discord.MessageEmbed()
			.setFooter(message.translate("economy/beg:AWARD"), message.author.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setColor(data.config.embed.color);

		let won = Math.floor(Math.random() * 150) + 1;

			embed.setDescription(message.translate("economy/beg:SALARY_CONTENT", {
				won
			}))

		data.memberData.money = data.memberData.money + won;
		data.memberData.save();

		const messageOptions = { embeds: [embed] };

		// Send the embed in the current channel
		message.channel.send(messageOptions);

	}

}

module.exports = Beg;