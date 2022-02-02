const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Daily extends Command {

	constructor (client) {
		super(client, {
			name: "daily",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "dl" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		// if the member is already in the cooldown db
		const isInCooldown = data.memberData.cooldowns.daily;
		if(isInCooldown){
			/*if the timestamp recorded in the database indicating 
            when the member will be able to execute the order again 
            is greater than the current date, display an error message */
			if(isInCooldown > Date.now()){
				return message.error("economy/daily:COOLDOWN", {
					time: message.convertTime(isInCooldown, "to", true)
				});
			}
		}

		// Records in the database the time when the member will be able to execute the command again (in 12 hours)
		const toWait = Date.now() + 43200000;
		data.memberData.cooldowns.daily = toWait;
		data.memberData.markModified("cooldowns");

		const embed = new Discord.MessageEmbed()
			.setFooter(message.translate("economy/daily:AWARD"), message.author.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.setColor(data.config.embed.color);

		let won = 5000;

			embed.addField(message.translate("economy/daily:SALARY"), message.translate("economy/daily:SALARY_CONTENT", {
				won
			}))

		data.memberData.money = data.memberData.money + won;
		data.memberData.save();

		const messageOptions = { embeds: [embed] };

		// Send the embed in the current channel
		message.channel.send(messageOptions);

	}

}

module.exports = Daily;
