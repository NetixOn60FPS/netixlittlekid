const discord = require ("discord.js")

module.exports.run = async (client, message, args) => {

    

    var embed = new discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor("RANDOM")
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Region", [message.guild.region], true)
        .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField("Verification Level", [message.guild.verificationLevel], true)
        .addField("Channels", message.guild.channels.size, true)
        .addField("Roles", message.guild.roles.size, true)
        .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)}`, true)
        .setThumbnail(message.guild.iconURL)
        .setFooter("Use Code Netix")
        .setTimestamp();

    message.channel.send(embed)

    }

module.exports.help = {
    name: "serverinfo"
}