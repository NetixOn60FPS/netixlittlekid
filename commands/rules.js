const discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    var Rchannel = message.guild.channels.find("name", "rules")
    if(!Rchannel) return message.channel.send("Can't find rules channel")

    var embed = new discord.RichEmbed()
        .setTitle("__**Official Rules**__")
        .setThumbnail(client.user.displayAvatarURL)
        .setColor("RANDOM")
        .setDescription("Hello everyone! Read the rules first before u go chilling!")
        .addField("Swearing", "We have an anti-swear bot, but if u swear against someone. It will result in a temp-mute.")
        .addField("Doxing", "Doxing can be hard for someone. Doxing will result in a ban.")
        .addField("Threathing", "Threathing isn't allowed on this server. If u threath someone in PM or in the server you will recive a free perm-mute.")
        .addField("NSFW", "NSFW or other 18+ content is not allowed on the server. It will result in a mute and kick.")
        .addField("Spamming", "Spamming is really annoying and ruines the chat. That means that Spamming is not allowed. It will result in a temp-mute.")
        .addField("Staff", "Always listen to staff! If you won't do that they can punish you.")
        .addField("Advertising", "Advertising is not allowed. Don't advertise youtube channels/video's, Social Media accounts, Support a Creator codes etc. You will recive a free temp-mute")
        .setFooter("Use Code Netix")
        .setTimestamp()

        return Rchannel.send(embed)

}

module.exports.help = {
    name: "rules"
}