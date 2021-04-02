const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
const version = "ALPHA-1.0.2";
const Guild = require("./models/prefix");
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
for(const file of commandFiles){
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
    });
    newGuild.save().catch(err => console.log(err));

});
bot.on('message', async message => {
    const settings = await Guild.findOne({ guildID: message.guild.id })

    console.log(settings)
    const prefix = settings.prefix;
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
})

bot.mongoose.init();
bot.login(process.env.token);