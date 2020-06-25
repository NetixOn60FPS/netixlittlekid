const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");
const ytdl = require('ytdl-core');

const client = new discord.Client();
client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Couldn't find any commands");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`The command ${f} is loaded`);

        client.commands.set(fileGet.help.name, fileGet);


    })

});

client.login(process.env.token)

client.on("ready", async () => {

    console.log(`${client.user.username} is cracking 90's.`)

    client.user.setActivity("Fortnite ft. Netix.", {type: "Streaming"} );

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", "Customer");
    
    if (!role) return;

    member.addRole(role);

    const channel = member.guild.channels.find("name", "welcome");

    if (!channel) return;

    var embed = new discord.RichEmbed()
    .setTitle("__**Welcome**__")
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`Welcome to the server ${member.user} . Make sure that you read <#723578219378245673>`)
    .setColor("RANDOM")
    .setFooter("Use Code Netix")
    .setTimestamp()

    channel.send(embed);

});

var swearWords = ["https://discord.gg", "kanker", "kkr" , "kk", "pussy", "psy", "pssy", "homo", "gay", "piemel", "kutje", "sperma"];

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var msg = message.content.toLowerCase();
    
    for (var i = 0; i < swearWords.length; i++) {

        if (msg.includes(swearWords[i])) {

            message.delete();
        }
    }

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(!message.content.startsWith(prefix)) return;

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client, message, arguments);


    if (command === `${prefix}kick`) {
 
        const args = message.content.slice(prefix.length).split(/ +/);

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
        
        if(kickUser.hasPermission("KICK_MEMBERS")) return message.reply("I can't kick that user")

        var kickChannel = message.guild.channels.find('name', "logs");

        if(!kickChannel) return message.reply("Make a channel called logs.")
 
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("you don't have perms to use this command");
 
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I can't kick that user");
 
        if (!args[1]) return message.reply("give a user");
 
        if (!args[2]) return message.reply("please specify a reason");
 
        var reason = args.slice(2).join(" ");
 
        if (!kickUser) return message.reply("I can't find that user");
 
        var embed = new discord.RichEmbed()
            .setColor("RANDOM")
            .setThumbnail(kickUser.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle("__**Moderation:**__ Kick")
            .setDescription(`** Kicked member:**`, kickUser.member)
            .addField(`** Kicked by:**`, message.member)
            .addField('Kicked In', message.channel)
            .addField('Kicked at', message.createdAt)
            .addField(`** Reason:**`, reason)
            .setFooter("Use Code Netix");
 
        var embedPrompt = new discord.RichEmbed()
            .setColor("#f5e642")
            .setAuthor("React in 30 seconds.")
            .setDescription(`Kick ${kickUser}?`);
 
 
        message.channel.send(embedPrompt).then(async msg => {
 
            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
 
 
            if (emoji === "✅") {
 
                msg.delete();
 
                kickUser.kick(reason).catch(err => {
                    if (err) return console.log(err)
                });
 
                kickChannel.send(embed);
 
            } else if (emoji === "❌") {
 
                msg.delete();
 
            }
 
        });
    }
 
 
    if (command === `${prefix}ban`) {
 
        const args = message.content.slice(prefix.length).split(/ +/);

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        if(banUser.hasPermission("KICK_MEMBERS")) return message.reply("I can't ban that user")

        var banChannel = message.guild.channels.find('name', "logs");

        if(!banChannel) return message.reply("Make a channel called logs.")

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("you don't have perms to use this command")
 
        if (!args[1]) return message.reply("give a user");
 
        if (!args[2]) return message.reply("please specify a reason");
 
        if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I can't ban that user");
 
        var reason = args.slice(2).join(" ");
 
        if (!banUser) return message.reply("I can't find that user");
 
        var embed = new discord.RichEmbed()
            .setThumbnail(banUser.user.displayAvatarURL)
            .setColor("RED")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle("__**Moderation:**__ Ban")
            .addField(`** Banned member:**`, banUser)
            .addField(`** Banned by:**`, message.member)
            .addField('Banned In', message.channel)
            .addField('Banned at', message.createdAt)
            .addField(`** Reason:**`, reason)
            .setFooter("Use Code Netix");
 
        var embedPrompt = new discord.RichEmbed()
            .setColor("RED")
            .setAuthor("Please react in 30 seconds.")
            .setDescription(`Ban ${banUser}?`);
 
 
        message.channel.send(embedPrompt).then(async msg => {
 
            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
 
 

             message.channel.awaitMessages(m => m.author.id == message.author.id,
                 { max: 1, time: 30000 }).then(collected => {
 
                    if (collected.first().content.toLowerCase() == 'yes') {
            
                         message.reply('Ban player.');
                    }                    
                        })
 
            if (emoji === "✅") {
 
                msg.delete();
 
               
                banUser.ban(reason).catch(err => {
                    if (err) return message.channel.send(`❌ Something went wrong. ❌`);
                });
 
                banChannel.send(embed);
 
            } else if (emoji === "❌") {
 
                msg.delete();
 
                message.reply("Ban canceled").then(m => m.delete(5000));
 
            }
 
        });
    }
 

async function promptMessage(message, author, time, reactions) {
    time *= 1000;
 
    for (const reaction of reactions) {
        await message.react(reaction);
    }
 
    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name)

}

});