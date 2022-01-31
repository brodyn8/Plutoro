const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class CreateInvite extends Command {

  constructor(client) {
    super(client, {
      name: "createinvite",
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["cinvite"],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      ownerOnly: true,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    let clientID = args[0];
    let permissions = args[1];
    if (!permissions) {
      permissions = "0";
    }
    if (permissions) {
      if (isNaN(permissions)) return message.error("owner/createinvite:INVALID_PERMISSIONS")
    }
    if (!clientID) return message.error("owner/createinvite:NO_ID")
    if (isNaN(clientID)) return message.error("owner/createinvite:INVALID_ID")
    const inviteLink = `https://discord.com/oauth2/authorize?client_id=${clientID}&permissions=${permissions}&scope=bot`;
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed().setColor(data.config.embed.color)
          .setFooter(data.config.embed.footer)
          .setDescription(`**Invite Link:**\n${inviteLink}`)
      ]
    });

  }
}

module.exports = CreateInvite;