const Discord = require('discord.js');
const Guild = require('../models/guild');
const Tokens = require('../models/tokens');
module.exports = {
    name: "color",
    description: "Sets server embed colors.",
    run: async (bot, message, args) => {
        const noPermissions = new Discord.MessageEmbed()
            .setDescription(":x: You do not have the required permission to use this command.")
            .setColor("RED")
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(noPermissions);
        const gSettings = await Guild.findOne({
            guildID: message.guild.id
        });
        const tSettings = await Tokens.findOne({
            guildID: message.guild.id
        });
        if (!gSettings) return;
        if (!tSettings) return message.channel.send("Premium is required to use this command.");
        if(tSettings.guildID === message.guild.id) {
            if(args[1] === 'reset') {
                const reset = new Discord.MessageEmbed()
                    .setTitle("Color")
                    .setColor('ff5959')
                    .setDescription("<:red_check:829200653796245504> Reset the server embed color to `ff5959`")
                    await Guild.findOneAndUpdate({
                        guildID: message.guild.id
                    }, {
                        color: 'ff5959'
                    })
                    message.channel.send(reset)
            } else if (args[1] !== "reset") {
                if (!args[1]) return message.channel.send("You need to supply a hex code.");
                if (!args[1].length >= 7) return message.channel.send("That is not a valid hex code.");
                if(!args[1].startsWith("#")) return message.channel.send("That is not a valid hex code.");
                const outcome = args[1].replace('#', '').toUpperCase();
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id
                }, {
                    color: outcome
                })
                const color = new Discord.MessageEmbed()
                    .setTitle("Color")
                    .setColor(outcome)
                    .setDescription(`<:green_check:826893895504887828> Your server embed color has been changed to \`#${outcome}\``)
                message.channel.send(color);
            }
        }
    }
}