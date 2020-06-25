const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryId = "723537555705954356";

    var userName = message.author.username;

    var userDiscriminator = message.author.discriminator;

    var bool = false;

    message.guild.channels.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("You have already created a ticket");

            bool = true;

        }

    });

    if (bool == true) return;

    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Hi, " + message.author.username)
        .setFooter("🎟️ Your ticket has been created.");

    message.channel.send(embedCreateTicket);

    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => { 

        createdChan.setParent(categoryId).then((settedParent) => { 


            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });

            settedParent.overwritePermissions(message.guild.roles.find('name', "Tickets Team"), { "READ_MESSAGES": true, "SEND_MESSAGES": true });

            settedParent.overwritePermissions(message.author, {

                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
            });

            var embedParent = new discord.RichEmbed()
                .setTitle("Hello, " + message.author.username.toString())
                .setDescription("Welcome! This is your ticket. Staff will be in a couple of minutes here. If staff didn't come in 15 minutes you can tag them.");

            settedParent.send(embedParent);
        }).catch(err => {
            console.log(err)
        });

    }).catch(err => {
        console.log(err)
    });

}

module.exports.help = {
    name: "ticket"
}