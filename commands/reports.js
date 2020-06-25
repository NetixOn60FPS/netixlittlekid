const discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if (message.deletable) {
        message.delete();
    }

    var target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    var reason = args.slice(1).join(' ');
    var reports = message.guild.channels.find('name', "reported-users");

    if (!target) return message.reply('please specify a member to report!');
    if (!reason) return message.reply('please specify a reason for this report!');
    if (!reports) return message.reply(`please create a channel called reports to log the reports!`);

    var embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(target.user.avatarURL)
        .addField('Reported Member', `${target.user.username}`)
        .addField('Reported By', `${message.author.username}`)
        .addField('Reported at', message.createdAt)
        .addField('Reported In', message.channel)
        .addField('Reported Reason', reason)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("Use Code Kytrez");

    message.channel.send(`${target} was reported by ${message.author} for ${reason}`).then(msg => msg.delete(2000));
    reports.send(embed);

};


module.exports.help = {
    name: 'report'
};