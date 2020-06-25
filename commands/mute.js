const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // /mute <@user> <time>

    var tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    var muteChannel = message.guild.channels.find('name', "logs");

    var reason = args.slice(2).join(" ");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have perms to use this command")

    if(!muteChannel) return message.reply("make a channel called logs")
    
    if(!tomute) return message.reply("I can't find that user");
    
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't mute that user");

    var muteRole = message.guild.roles.find(`name`, "Muted");

    if (!muteRole) return message.reply("I can't find the muted role")
    
        var reason = args.slice(1).join(" ");
        if(!reason) return message.reply("please specify a reason")

        await(tomute.addRole(muteRole.id)); 
        message.channel.send(`<@${tomute.id}> has been muted`);

        var embed = new discord.RichEmbed()
        .setTitle("__**Moderation:**__ Mute")
        .setColor("#4287f5")
        .setThumbnail(tomute.user.displayAvatarURL)
        .addField(`Muted Member:`, tomute)
        .addField("Muted by", message.member)
        .addField('Muted In', message.channel)
        .addField('Muted at', message.createdAt)
        .addField("Reason", reason)
        .setFooter("Use Code Netix")
        .setTimestamp()

    muteChannel.send(embed)
   }

module.exports.help = {
    name: "mute"
}