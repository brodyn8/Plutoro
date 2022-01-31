const Command = require("../../base/Command.js");

class Ping extends Command {

	constructor (client) {
		super(client, {
			name: "ping",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "pong", "latency" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (message) {
		message.sendT("general/ping:CONTENT", {
			ping: this.client.ws.ping
		})
	}

}

module.exports = Ping;