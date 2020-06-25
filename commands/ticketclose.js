const discord = require("discord.js")

module.exports.run = async(client, message, args) => {

    const categoryID = "718533071351054357";

    if(message.channel.parentID == categoryID){

        message.channel.delete()
    }else {
        message.channel.send("You can only use this in a ticket channel.")
    }

    var embed = new discord.RichEmbed()
    .setTitle("Hi, " + message.author.username)
    .setDescription("Your ticket is marked as **complete**")
    .setFooter("Use Code Netix")
    .setTimestamp()

    message.channel.send(embed)

}

module.exports.help = {
    name:"close"
}