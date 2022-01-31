const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Changelog extends Command {

	constructor (client) {
		super(client, {
			name: "changelog",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "update" ],
			memberPermissions: [ "MENTION_EVERYONE" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        
		const text = args.join(" ");
		if(!text){
			return message.error("owner/changelog:MISSING_TEXT");
		}
		if(text.length > 1030){
			return message.error("owner/changelog:TOO_LONG");
		}

		message.delete().catch(() => {});

		let mention = "";
            
		const msg = await message.sendT("owner/changelog:MENTION_PROMPT");

		const collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 240000 });
            
		collector.on("collect", async (tmsg) => {
    
			if(tmsg.content.toLowerCase() === message.translate("common:NO").toLowerCase()){
				tmsg.delete();
				msg.delete();
				collector.stop(true);
			}
            
			if(tmsg.content.toLowerCase() === message.translate("common:YES").toLowerCase()){
				tmsg.delete();
				msg.delete();
				const tmsg1 = await message.sendT("owner/changelog:MENTION_TYPE_PROMPT");
				const c = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 60000 });
				c.on("collect", (m) => {
					if(m.content.toLowerCase() === "here"){
						mention = "@here";
						tmsg1.delete();
						m.delete();
						collector.stop(true);
						c.stop(true);
					} else if(m.content.toLowerCase() === "every"){
						mention = "@everyone";
						tmsg1.delete();
						m.delete();
						collector.stop(true);
						c.stop(true);
					}
				});
				c.on("end", (collected, reason) => {
					if(reason === "time"){
						return message.error("misc:TIMES_UP");
					}
				});
			}
		});
    
		collector.on("end", (collected, reason) => {
    
			if(reason === "time"){
				return message.error("misc:TIMES_UP");
			}

			const embed = new Discord.MessageEmbed()
				.setAuthor(message.translate("owner/changelog:TITLE"))
				.setColor(data.config.embed.color)
				.setFooter(message.author.tag)
				.setTimestamp()
				.setDescription(text);

      if(mention) mention = mention;
      if(!mention) mention = " ";
            
			message.channel.send({
				content: mention,
				embeds: [embed],
				allowedMentions: {
					parse: ["users", "everyone", "roles"]
				}
			});
		});

	}

}

module.exports = Changelog;