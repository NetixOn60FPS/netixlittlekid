const discord = require ("discord.js")

module.exports.run = async(client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that.");

    var argsresult;
    var mChannel = message.mentions.channels.first()
    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }
}

module.exports.help = {
    name: "say"
}