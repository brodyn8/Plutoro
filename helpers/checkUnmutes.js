const Discord = require("discord.js");

/* THIS CHECK IF THERE IS A USER TO UNMUTE */

module.exports = {
    
	/**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
	async init(client){
		client.membersData.find({ "mute.muted": true }).then((members) => {
			members.forEach((member) => {
				client.databaseCache.mutedUsers.set(`${member.id}${member.guildID}`, member);
			});
		});
		setInterval(async () => {
			client.databaseCache.mutedUsers.filter((m) => m.mute.endDate <= Date.now()).forEach(async (memberData) => {
				const guild = client.guilds.cache.get(memberData.guildID);
				if(!guild) return;
				const member = guild.members.cache.get(memberData.id) || await guild.members.fetch(memberData.id).catch(() => {
					memberData.mute = {
						muted: false,
						endDate: null,
						case: null
					};
					memberData.save();
					client.logger.log("[unmute] "+memberData.id+" cannot be found.");
					return null;
				});
				const guildData = await client.findOrCreateGuild({ id: guild.id });
				guild.data = guildData;
				if(member){
					guild.channels.cache.forEach((channel) => {
						channel.permissionOverwrites.delete(member.id);
					});
				}
				const user = member ? member.user : await client.users.fetch(memberData.id);
				const embed = new Discord.MessageEmbed()
					.setDescription(guild.translate("moderation/unmute:SUCCESS_CASE", {
						user: user.toString(),
						usertag: user.tag,
						count: memberData.mute.case
					}))
					.setColor("#2C2F33")
					.setFooter(guild.client.config.embed.footer);
				const channel = guild.channels.cache.get(guildData.plugins.modlogs);
				if(channel){
					channel.send({ embeds: [embed] });
				}
				memberData.mute = {
					muted: false,
					endDate: null,
					case: null
				};
				client.databaseCache.mutedUsers.delete(`${memberData.id}${memberData.guildID}`);
				await memberData.save();
			});
		}, 1000);
	}

};
