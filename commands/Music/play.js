const Command = require("../../base/Command.js");
const { QueryType } = require('discord-player');

class Play extends Command {

  constructor(client) {
    super(client, {
      name: "play",
      dirname: __dirname,
      enabled: false,
      guildOnly: true,
      aliases: ["p"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 5000
    });
  }

  async run(message, args) {
    if (!channel) return message.reply({
				embeds: [
					new MessageEmbed().setTitle(`**Please join ${guild.me.voice.channel ? "__my__" : "a"} voice channel first**`)
				],

			})
			if (channel.userLimit != 0 && channel.full)
				return message.reply({
					embeds: [new MessageEmbed()
						.setTitle(`Your voice channel is full, I can not join!`)
					],
				});
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} I am already connected somewhere else`)
					],
				});
			}
			if (!args[0]) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} **Please add a search query**`)
						.setDescription(`**Usage:**\n> \`${client.settings.get(message.guild.id, "prefix")}play <search/link>\``)
					],
				});
			}
			//let IntOption = options.getInteger("OPTIONNAME"); //same as in IntChoices //RETURNS NUMBER
			const Text = args.join(" ") //same as in StringChoices //RETURNS STRING 
			//update it without a response!
			let newmsg = await message.reply({
				content: `${client.allEmojis.searching} Searching... \`\`\`${Text}\`\`\``,
			}).catch(e => {
				console.log(e)
			})
			try {
				let queue = client.distube.getQueue(guildId)
				let options = {
					member: member,
				}
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				await client.distube.play(channel, Text, options)
				//Edit the reply
				newmsg.edit({
					content: `${queue?.songs?.length > 0 ? `${client.allEmojis.check_mark} Added` : `${client.allEmojis.now_playing} Now Playing`}: \`\`\`css\n${Text}\n\`\`\``,
				}).catch(e => {
					console.log(e)
				})
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({
					content: `${client.allEmojis.x} | Error: `,
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor)
						.setDescription(`\`\`\`${e}\`\`\``)
					],

				})
			}
		}

}

module.exports = Play; 