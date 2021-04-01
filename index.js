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
const noPermissions = new Discord.MessageEmbed()
    .setDescription(":x: You do not have the required permission to use this command.")
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
                return message.channel.send(noPermissions).then(m => m.delete({
                    timeout: 10000
                }));
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

                    return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({
                        timeout: 10000
                    }));
                }
            });

            if (!args[1]) {
                const noPrefix = new Discord.MessageEmbed()
                    .setTitle("Prefix")
                    .setColor("RED")
                    .setDescription("Change the prefix for your server.")
                    .addField("Current Prefix:", `\`${settings.prefix}\``)
                    .addField("Change Prefix:", `\`${settings.prefix}prefix <New Prefix>\``)
                    .setTimestamp()
                return message.channel.send(noPrefix).then(m => m.delete({timeout: 10000}));
            };
            if (args[1].length > 3) {
                return message.channel.send(`This prefix is too long, please choose a shorter prefix.`)
            }

            await settings.updateOne({
                prefix: args[1]
            });
            const setPrefix = new Discord.MessageEmbed()
                .setTitle("Prefix")
                .setColor("GREEN")
                .addField("Prefix Updated", `Your guild's prefix has been updated to \`${settings.prefix}\``)
                .setTimestamp()
            return message.channel.send(setPrefix);
    }
})

bot.mongoose.init();
bot.login(process.env.token);