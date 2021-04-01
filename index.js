const Discord = require('discord.js');
const bot = new Discord.Client();
const mongoose = require('mongoose');
const version = "ALPHA-1.0.1";
const Guild = require("./models/prefix");
bot.on('ready', () => {
    console.log(`Grahmaham Version: ${version} is starting...`);
    console.log(` `)
    console.log(`Grahmaham is online.`)
    bot.user.setActivity(`${version} | !!help`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/WhoCutTehCheese"
    });
})
bot.mongoose = require('./utils/mongoose.js')
bot.on("guildCreate", async guild => {
    const newGuild = new Guild({
        guildID: guild.id,
        guildName: guild.name,
        prefix: "!!",
    });
    newGuild.save().catch(err => console.log(err));

});
bot.on('message', async message => {
    const settings = await Guild.findOne({
        guildID: message.guild.id
})
    const prefix = settings.prefix;
    if (!message.content.startsWith(prefix)) return;


    let args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case "prefix":
            if (!message.member.hasPermission('MANAGE_GUILD')) {
                return message.channel.send('You do not have permission to use this command!').then(m => m.delete({timeout: 10000}));
            };
    
            const settings = await Guild.findOne({
                guildID: message.guild.id
            }, (err, guild) => {
                if (err) console.error(err)
                if (!guild) {
                    const newGuild = new Guild({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        guildName: message.guild.name,
                        prefix: "!!"
                    })
    
                    newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
    
                    return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
                }
            });
    
            if (args.length < 1) {
                return message.channel.send(`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\``).then(m => m.delete({timeout: 10000}));
            };
    
            await settings.updateOne({
                prefix: args[0]
            });
    
            return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);
    }
})

bot.mongoose.init();
bot.login(process.env.token);