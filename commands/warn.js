const discord = require("discord.js")
const fs = require("fs")
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.channel.send("I can't find that user");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't warn that user");

    var warnChannel = message.guild.channels.find('name', "logs");

    if(!warnChannel) return message.channel.send("Make a channel called logs.")

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("you don't have perms to use this command");

    if (!args[0]) return message.reply("give a user");

    if (!args[1]) return message.reply("please specify a reason");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I don't have permissions!");

    if (!warns[warnUser.id]) warns[warnUser.id] = {
            warns: 0
        };

    warns[warnUser.id].warns++;
    
fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
});

    
    var embed = new discord.RichEmbed()
        .setColor("ORANGE")
        .setThumbnail(warnUser.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setTitle("__**Moderation:**__ Warn")
        .addField("**Warned User**", warnUser)
        .addField("**Warned By:**", message.member)
        .addField('Warned In', message.channel)
        .addField('Warned at', message.createdAt)
        .addField("Reason", reason)
        .addField("Current warns:", warns[warnUser.id].warns)
        .setFooter("Use Code Netix");

    warnChannel.send(embed);

    if (warns[warnUser.id].warans === 3) {

    var embed = new discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("Last warn!")
        .addField("Message:", "This is your last warn before you get punished!");

    messsage.reply(embed);
    
}




}
    

module.exports.help = {
    name: "warn"
}