const Command = require("../../base/Command.js");

class AdminPay extends Command {

	constructor (client) {
		super(client, {
			name: "admin-pay",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["admin-give"],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: true,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return message.error("owner/admin-pay:INVALID_MEMBER");
		}
		if(member.user.bot){
			return message.error("owner/admin-pay:BOT_USER");
		}
		/*if(member.id === message.author.id){
			return message.error("owner/admin-pay:YOURSELF");
    }*/
		const sentAmount = args[1];
		if(!sentAmount || isNaN(sentAmount) || parseInt(sentAmount, 10) <= 0){
			return message.error("owner/admin-pay:INVALID_AMOUNT", {
				username: member.user.tag
			});
		}

		const amount = Math.ceil(parseInt(sentAmount, 10));

		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

		memberData.money = memberData.money + parseInt(amount, 10);
		memberData.save();

		// Send a success message
		message.success("owner/admin-pay:SUCCESS", {
			amount,
			username: member.user.tag
		});

	}

}

module.exports = AdminPay; 