const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
const version = "ALPHA-1.0.3";
const Guild = require("./models/guild");
const Tokens = require("./models/tokens");
bot.on('ready', () => {
    console.log(`Grahmaham Version: ${version} is starting...`);
    console.log(` `)
    console.log(`Grahmaham is online.`)
    bot.user.setActivity(`${version} | !!help`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/WhoCutTehCheese"
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
        premium: false,
    })
    newGuild.save().catch(err => console.log(err));

});
bot.on('guildDelete', async guild => {
    await sConfig.findOneAndRemove({
        guildID: guild.id
    })
});
bot.on('message', async message => {
    // const pTokens = await Tokens.findOne({
    //     userID: message.author.id
    // }, (err, guild) => {
    //     if (err) console.log(err)
    //     if (!guild) {
    //         const newTokens = new Tokens({
    //             userID: message.author.id,
    //             userName: message.author.tag,
    //             tokens: 0,
    //         })
    //         newTokens.save().catch(err => console.log(err));
    //     }
    // })
    // const newTokens = new Tokens({
    //     userID: message.author.id,
    //     userName: message.author.tag,
    //     tokens: 0,
    // })
    const settings = await Guild.findOne({
        guildID: message.guild.id
    })
    const ping = new Discord.MessageEmbed()
        .setTitle("Prefix")
        .setColor(`${settings.color}`)
        .addField("Server Prefix", `The current server prefix is \`${settings.prefix}\`.\nUse \`${settings.prefix}prefix reset\` to reset the server prefix.`)

    const prefix = `${settings.prefix}`;

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
        case "test":
            message.channel.send(bot.guild.cache.size);
    }
})

bot.mongoose.init();
bot.login(process.env.token);