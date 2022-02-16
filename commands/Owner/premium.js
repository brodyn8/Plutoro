const Command = require("../../base/Command.js");
const rgx = /^(?:<@!?)?(\d+)>?$/;

class Premium extends Command {

  constructor(client) {
    super(client, {
      name: "premium",
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: true,
      cooldown: 3000
    });
  }

  async run(message, args, data) {

    const type = args[0];
    if (!type || type !== "add" && type !== "remove" && type !== "check") {
      return message.error("owner/premium:MISSING_TYPE");
    }

    if (type === "add") {
      data.guild.premium = true;
      data.guild.save();
      message.success("owner/premium:ENABLED", {
        guildName: message.guild.name
      });
    }
    if (type === "remove") {
      data.guild.premimum = false;
      data.guild.save();
      message.success("owner/premium:DISABLED", {
        guildName: message.guild.name
      });
    }
  }
}

module.exports = Premium; 