const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {

    // /mute <@user> <time>

    var tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    var muteChannel = message.guild.channels.find('name', "logs");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have perms to use this command")

    if(!muteChannel) return message.reply("Make a channel called logs")
    
    if(!tomute) return message.reply("I can't find that user");
    
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't mute that user");

    var muteRole = message.guild.roles.find(`name`, "Muted");

    if (!muteRole) return message.reply("I can't find the muted role")

        var reason = args.slice(2).join(" ");
        if(!reason) return message.reply("please specify a reason")
        var mutetime = args[1];
        if(!mutetime) return message.reply("please specify a time")

        await(tomute.addRole(muteRole.id)); 
        message.channel.send(`<@${tomute.id}> has been muted`);

        setTimeout(function() {
        tomute.removeRole(muteRole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted.`);

        }, ms(mutetime));
        
        var embed = new discord.RichEmbed()
            .setTitle("__**Moderation:**__ Temp-Mute")
            .setColor("#4287f5")
            .setThumbnail(tomute.user.displayAvatarURL)
            .addField(`** Temp-Muted Member:**`, tomute)
            .addField("Temp-Muted by", message.member)
            .addField('Temp-Muted In', message.channel)
            .addField('Temp-Muted at', message.createdAt)
            .addField("Time", mutetime)
            .addField("Reason", reason)
            .setFooter("Use Code Netix")
            .setTimestamp()



        muteChannel.send(embed)
   }

module.exports.help = {
    name: "tempmute"
}