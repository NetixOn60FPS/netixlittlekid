const discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    var Rchannel = message.guild.channels.find("name", "tickets")
    if(!Rchannel) return message.channel.send("Can't find tickets channel")

    var embed = new discord.RichEmbed()
        .setTitle("__**Tickets**__")
        .setThumbnail(client.user.displayAvatarURL)
        .setColor("RANDOM")
        .addField("Usage", "You can make your ticket by using: \n \n -ticket \n \n Staff will be soon in ur ticket to help you \n \n Good luck :)")
        .setTimestamp()
        .setFooter("Use Code Netix")


        return Rchannel.send(embed)

}

module.exports.help = {
    name: "ticket2"
}