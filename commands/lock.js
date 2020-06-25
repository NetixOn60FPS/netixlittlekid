const ms = require("ms")

module.exports.run = async (client, message, args) => {

    if (!client.lockit) client.lockit = [];
    var time = args.join(" ");
    var validUnlocks = ['release', 'unlock'];
    if(!time) return message.channel.send("You must set a duration of the lockdown");

    if(validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        
        }).then(() => {
            message.channel.send("Lockdown lifted")
            clearTimeout(client.lockit[message.channel.id])
            delete client.lockit[message.channel.id]
        }).catch(error => {
            console.log(error)
        });
    }else{
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {

                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(message.channel.send("Lockdown lifted")).catch(console.error)
                    delete client.lockit[message.channel.id]
                },ms(time));

            }).catch(error =>{
                console.log(error)
            });
        });
    }
}

module.exports.help = {
  name: "lock"
}