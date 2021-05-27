const Discord = require('discord.js');
const version = "ALPHA-1.1.0";
const bot = new Discord.Client({
    presence: {
        status: "dnd",
        activity: {
            name: `!!help | ${version}`,
            type: 'STREAMING',
            url: "https://youtube.com/whocutthecheese"
        }
    }
});
const fs = require('fs');
const mongoose = require('mongoose');
const Guild = require("./models/guild");
const Tokens = require("./models/tokens");
const Logs = require('./models/logs');
bot.on('ready', async () => {
    console.log(`Grahmaham Version: ${version} is starting...`);
    console.log(` `)
    console.log(`Grahmaham is online.`)
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
    const token = await Tokens.findOne({
        guildID: message.guild.id
    })
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
    if (!message.guild.me.hasPermission("SEND_MESSAGES", "EMBED_LINKS")) { return; }
    if (message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES", "EMBED_LINKS")) { return; }


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

    if (message.author.bot) return;
    if (message.mentions.members.first()) {
        if (message.mentions.members.first().id == '827730038106882049') {
            message.channel.send(ping)
        }
    }


    if (!message.content.startsWith(prefix)) return;


    let args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case "prefix":
            bot.commands.get('prefix').run(bot, message, args);
            break
        case "givepremium":
            bot.commands.get('givepremium').run(bot, message, args)
            break
        case "premium":
            bot.commands.get('premium').run(bot, message, args)
            break
        case "help":
            bot.commands.get('help').run(bot, message, args);
            break
        case "color":
            bot.commands.get('color').run(bot, message, args);
            break
        case "serverinfo":
            bot.commands.get('serverinfo').run(bot, message, args);
            break
        case "userinfo":
            bot.commands.get('userinfo').run(bot, message, args);
            break
        case "logs":
            bot.commands.get('logs').run(bot, message, args);
            break
        case "check":
            bot.commands.get('check').run(bot, message, args);
            break
    }


})
require("./logging/logs")(bot);
bot.mongoose.init();
bot.login("ODI3NzMwMDM4MTA2ODgyMDQ5.YGfRqw.PH6cV1QIGLKBiUU4IX0ufjONucI");
//bot.login(process.env.token);