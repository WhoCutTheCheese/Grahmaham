const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
const version = "ALPHA-1.0.3";
const Guild = require("./models/guild");
const Tokens = require("./models/tokens");
bot.on('ready', async () => {
    console.log(`Grahmaham Version: ${version} is starting...`);
    console.log(` `)
    console.log(`Grahmaham is online.`)
    bot.user.setActivity(`${version} | !!help`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/WhoCutTehCheese"
    })
});
bot.on('message', async message => {
    const settings = await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: "!!",
                color: `ff5959`,
            })

            newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
        }
    });
});
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}
const noPermissions = new Discord.MessageEmbed()
    .setDescription(":x: You do not have the required permission to use this command.")
    .setColor("RED")
bot.mongoose = require('./utils/mongoose.js')
bot.on("guildCreate", async guild => {
    const newGuild = new Guild({
        guildID: guild.id,
        guildName: guild.name,
        prefix: "!!",
        color: "ff5959",
    })
    newGuild.save().catch(err => console.log(err));

});
bot.on('guildDelete', async guild => {
    await Guild.findOneAndRemove({
        guildID: guild.id
    })
});
bot.on('message', async message => {
    const server = await Guild.findOne({
        guildID: message.guild.id
    })
    if (!server) {
        return message.channel.send("This server does not have a Database collection. We're creating one for you.")
    }

    const prefix = `${server.prefix}`;
    const ping = new Discord.MessageEmbed()
        .setTitle("Prefix")
        .setColor(`${server.color}`)
        .addField("Server Prefix", `The current server prefix is \`${server.prefix}\`.\nUse \`${server.prefix}prefix reset\` to reset the server prefix.`)

    if (!message.content.toLowerCase().startsWith(prefix) && message.content.toLowerCase().startsWith(`<@!733885185497497682>`)) {
        message.channel.send(ping);
        return;
    }

    if (!message.content.startsWith(prefix)) return;


    let args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case "prefix":
            bot.commands.get('prefix').run(bot, message, args);
    }
    switch (args[0]) {
        case "help":
            bot.commands.get('help').run(bot, message, args);
    }
    switch (args[0]) {
        case "premium":
            bot.commands.get('premium').run(bot, message, args);
    }
})

bot.mongoose.init();
//bot.login("ODI3NzMwMDM4MTA2ODgyMDQ5.YGfRqw.yvV87xYlmwBDJJm84ksQalIZ-IA");
bot.login(process.env.token);