const discord = require('discord.js');
const moment = require("moment")

module.exports.run = async (client, message, args) => {

    var GuildMember = message.mentions.users.first() || message.author;
    console.log(GuildMember.roles);

    var embed = new discord.RichEmbed()
        .setTitle(`${GuildMember.tag}`)
        .setThumbnail(GuildMember.avatarURL)        
        .setColor("RANDOM")
        .addField("ID:", `${GuildMember.id}`)
        .addField("In Server", message.guild.name)
        .addField('Status:', GuildMember.presence.status)
        .addField("Game:", `${GuildMember.presence.game ? GuildMember.presence.game.name : 'None'}`)
        .addField("Joined The Server On:", `${moment.utc(GuildMember.joinedAt).format("dddd, MMMM Do YYYY")}`)
        .addField("Account Created On:", `${moment.utc(GuildMember.createdAt).format("dddd, MMMM Do YYYY")}`)
        .setTimestamp()
        .setFooter("Use Code Netix");


    message.channel.send(embed);
}

module.exports.help = {
    name: 'userinfo'
}