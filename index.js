const Discord = require('discord.js');
const bot = new Discord.Client();
const mongoose = require('mongoose');
const version = "ALPHA-1.0.0";
bot.on('ready', () => {
    console.log(`Grahmaham Version: ${version} is starting...`);
    console.log(` `)
    console.log(`Grahmaham is online.`)
    bot.user.setActivity(`${version} | !!help`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/WhoCutTehCheese"
    });
})





bot.mongoose.init();
bot.login(process.env.token);
