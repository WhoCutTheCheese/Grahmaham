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





client.mongoose.init();
bot.login("NzMzODg1MTg1NDk3NDk3Njgy.XxJp1w.qQoaK2JOB1CIWyCI00WalmfJZog");