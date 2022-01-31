const Command = require("../../base/Command.js");

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

    const query = args.join(" ");
    if (!query) {
      return message.error("music/play:MISSING_SONG_NAME");
    }

    const voice = message.member.voice.channel;
    if (!voice) {
      return message.error("music/play:NO_VOICE_CHANNEL");
    }

    // Check my permissions
    const perms = voice.permissionsFor(this.client.user);
    if (!perms.has("CONNECT") || !perms.has("SPEAK")) {
      return message.error("music/play:VOICE_CHANNEL_CONNECT");
    }

    const queue = player.createQueue(message.guild);
    const song = await player.search(query, {
      requestedBy: message.author
    });

    try {
      await queue.connect(message.member.voice.channel);
    } catch {
      return message.error("music/play:VOICE_CHANNEL_CONNECT");
    }

    queue.addTrack(song.tracks[0]);
    queue.play();
  }

}

module.exports = Play; 