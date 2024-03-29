const Discord = require('discord.js');
const Tokens = require('../models/tokens');
const Guild = require("../models/guild");
const mongoose = require('mongoose')
module.exports = {
    name: "premium",
    description: "Enable premium commands for your server.",
    run: async (bot, message, args) => {
        const hasPrem = await Tokens.findOne({
            guildID: message.guild.id,
        })
        const settings = await Tokens.findOne({
            userID: message.author.id
        })
        const guildSettings = await Guild.findOne({
            guildID: message.guild.id,
        })
        const cPrem = await Tokens.findOne({
            guildID: message.guild.id
        })
        if (args[1] === "redeem") {
            if (!settings) return message.channel.send("You do not have a premium token to use.")
            if (settings.guildID === message.guild.id) return message.channel.send("This guild already has premium!")
            if (hasPrem) return message.channel.send("This guild already has premium enabled.")
            if (settings.tokens === 1) {
                const premiumEnabled = new Discord.MessageEmbed()
                    .setTitle("Premium")
                    .setColor(guildSettings.color)
                    .setDescription(`<a:online:831898654432165888> Premium has been enabled for **${message.guild.name}**`)
                    .setFooter(`${message.author.tag} - ${message.guild.name}`)
                message.channel.send(premiumEnabled)
                console.log(`Premium has been enabled for ${message.guild.name} (${message.guild.id}). If this was unauthorized please revoke it forcefully.`)
                const updateTokens = await Tokens.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    userID: message.author.id,
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    tokens: 0,
                })
            } else if (settings.token !== 1) {
                message.channel.send("You do not have a premium token to use.")
            }

        } else if (args[1] === "revoke") {
            if (!settings) return message.channel.send("This server does not have premium enabled.")
            if (settings.userID !== message.author.id) return message.channel.send("You do not have premium enabled on this server. Or you were not the one to enable premium on this server.")
            if (settings.guildID === message.guild.id) {
                const disabledPremium = new Discord.MessageEmbed()
                    .setTitle("Premium")
                    .setColor("ff5959")
                    .setDescription(`<a:down:831900256827605043> Premium was disabled on **${message.guild.name}** and \`1\` premium token has been added to your balence`)
                    .setFooter(`${message.author.tag} - ${message.guild.name}`)
                message.channel.send(disabledPremium)
                console.log(`Premium was disabled on ${message.guild.name} (${message.guild.id}) by ${message.author.tag}`)

                const revokePrem = await Tokens.findOneAndUpdate({
                    guildID: message.guild.id,
                }, {
                    guildName: "None",
                    guildID: "None",
                    tokens: 1
                })

                await Guild.findOneAndUpdate({
                    guildID: message.guild.id,
                }, {
                    color: "ff5959"
                })

            } else {
                message.channel.send("This server does not have premium enabled.")
            }
        } else if (!args[1]) {
            const premium = new Discord.MessageEmbed()
                .setTitle("Premium")
                .setColor(guildSettings.color)
                .setDescription("Enable/Check/Revoke premium.")
                .addField("Premium Sub Commands", `\`${guildSettings.prefix}premium [Redeem/Revoke/Check]\``)
                .setFooter(`${message.author.tag} - ${message.guild.name}`)
            return message.channel.send(premium)
        } else if (args[1] === "check") {
            const yesTokens = new Discord.MessageEmbed()
                .setTitle("Premium")
                .setColor(guildSettings.color)
                .setDescription("View your current premium status.")
                .addField("Tokens:", "`1`", true)
                .addField("Premium Status:", "`DISABLED`", true)
                .setFooter(`${message.author.tag} - ${message.guild.name}`)
            const yesPremium = new Discord.MessageEmbed()
                .setTitle("Premium")
                .setColor(guildSettings.color)
                .setDescription("View your current premium status.")
                .addField("Tokens:", "`0`", true)
                .addField("Premium Status:", "`ENABLED`", true)
                .setFooter(`${message.author.tag} - ${message.guild.name}`)
            const noTokens = new Discord.MessageEmbed()
                .setTitle("Premium")
                .setColor(guildSettings.color)
                .setDescription("View your current premium status.")
                .addField("Tokens:", "`0`", true)
                .addField("Premium Status:", "`DISABLED`", true)
                .setFooter(`${message.author.tag} - ${message.guild.name}`)
            if (!settings) return message.channel.send(noTokens);
            if (settings.guildID === message.guild.id) return message.channel.send(yesPremium);
            if (settings.tokens === 1) return message.channel.send(yesTokens)
            if (cPrem) {
                const otherServer = new Discord.MessageEmbed()
                    .setTitle("Premium")
                    .setColor(guildSettings.color)
                    .setDescription("View your current premium status.")
                    .addField("Tokens:", "`0`", true)
                    .addField("Guild Premium Status:", "`ENABLED`", true)
                    .addField("Currently Active In:", `\`${settings.guildName}\``)
                    .setFooter(`${message.author.tag} - ${message.guild.name}`)
                return message.channel.send(otherServer)
            } else {
                const otherServer = new Discord.MessageEmbed()
                    .setTitle("Premium")
                    .setColor(guildSettings.color)
                    .setDescription("View your current premium status.")
                    .addField("Tokens:", "`0`", true)
                    .addField("Guild Premium Status:", "`DISABLED`", true)
                    .addField("Currently Active In:", `\`${settings.guildName}\``)
                    .setFooter(`${message.author.tag} - ${message.guild.name}`)
                return message.channel.send(otherServer)
            }

        }
    }

}