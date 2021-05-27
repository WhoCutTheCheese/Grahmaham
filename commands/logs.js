const Discord = require('discord.js');
const Guild = require("../models/guild");
const Tokens = require("../models/tokens");
const Logs = require("../models/logs");
module.exports = {
    name: "logs",
    run: async (bot, message, args) => {
        const d = new Date();
        const logs = await Logs.findOne({
            guildID: message.guild.id
        })
        const guildSettings = await Guild.findOne({
            guildID: message.guild.id
        })
        const noPermissions = new Discord.MessageEmbed()
            .setDescription(":x: You do not have the required permission to use this command.")
            .setColor("RED")
        if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send(noPermissions);
        if (!args[1]) {
            const logsHelp = new Discord.MessageEmbed()
                .setTitle("Logs")
                .setColor(guildSettings.color)
                .setDescription(`Context: \n[] = Not required argument\n<> = Required argument`)
                .addField("Permissions:", "`MANAGE_SERVER`", true)
                .addField("Usage:", `\`${guildSettings.prefix}logs <module> <value>\``, true)
                .addField("`setmessagechannel <#channel>`", "Sets a logging channel for all Message related events. Such as when a message is edited it will log it.")
                .addField("`setchannellogging <#channel>`", "Sets a logging channel for events relating to channels. Such as when a channel name is changed it will log it.")
                .addField("`setrolechannel <#channel>`", "Sets a logging channel for all events involving roles. When a role name is changed it logs it.")
                .addField("`setmodchannel <#channel>`", "Sets a logging channel for all moderation events, such as when a user is banned it logs it.")
                .addField("`setallchannels <#channel>`", "Sets all logging channels.")
                .addField("Exempts:", "Add roles and users that the bot will not log.")
                .addField("`bypassrole <@role/roleID>`", "Set a role in which Grahmaham will ignore when logging.")
                .addField("`bypassuser <@user/userID>`", "Set a user in which Grahmaham will ignore when logging.")
                .addField("`bypasschannel <#channel>`", "Set a channel in which Grahmaham will ignore when logging.")
                .addField("Other:", "Stuff that doesn't fit in the first 2 catagories.")
                .addField("`quicksetup`", "Quickly setup all the essential logging componants.")
                .setFooter(`${message.author.tag} ▪️ ${d.toLocaleTimeString()}`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(logsHelp)
        }
        if (args[1] === "setmessagechannel") {
            if (!logs) {
                const newLogs = await new Logs({
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    msgChannel: "None",
                    channelLog: "None",
                    roleChannel: "None",
                    modChannel: "None",
                    bypassRole: "None",
                    bypassUser: "None",
                })
                newLogs.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                return message.channel.send("We're adding your server to our database. No changes were made.")
            }
            if (!args[2]) {
                const usage = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .addField("Usage:", `\`${guildSettings.prefix}logs setmessagechannel <#channel>\``)
                    .setFooter(`${message.author.tag} ▪️ ${d.toLocaleTimeString()}`)
                return message.channel.send(usage)
            }
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(channel => channel.type == 'text' && channel.name.toLowerCase().includes(args[2]))
            if (!channel) return message.channel.send("> :x:Invalid channel!")
            if (channel) {
                await Logs.findOneAndUpdate({
                    guildID: message.guild.id,
                }, {
                    msgChannel: channel
                })
                const success = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .setDescription(`<a:online:831898654432165888> Set the \`Message Logging\` channel to <#${channel.id}>`)
                message.channel.send(success)
            }
        }
        if (args[1] === "setchannellogging") {
            if (!logs) {
                const newLogs = await new Logs({
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    msgChannel: "None",
                    channelLog: "None",
                    roleChannel: "None",
                    modChannel: "None",
                    bypassRole: "None",
                    bypassUser: "None",
                })
                newLogs.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                return message.channel.send("We're adding your server to our database. No changes were made.")
            }
            if (!args[2]) {
                const usage = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .addField("Usage:", `\`${guildSettings.prefix}logs setchannellogging <#channel>\``)
                    .setFooter(`${message.author.tag} ▪️ ${d.toLocaleTimeString()}`)
                return message.channel.send(usage)
            }
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(channel => channel.type == 'text' && channel.name.toLowerCase().includes(args[2]))
            if (!channel) return message.channel.send("> :x:Invalid channel!")
            if (channel) {
                await Logs.findOneAndUpdate({
                    guildID: message.guild.id,
                }, {
                    channelLog: channel
                })
                const success = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .setDescription(`<a:online:831898654432165888> Set the \`Channel Logging\` channel to <#${channel.id}>`)
                message.channel.send(success)
            }
        }
        if (args[1] === "setrolechannel") {
            if (!logs) {
                const newLogs = await new Logs({
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    msgChannel: "None",
                    channelLog: "None",
                    roleChannel: "None",
                    modChannel: "None",
                    bypassRole: "None",
                    bypassUser: "None",
                })
                newLogs.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                return message.channel.send("We're adding your server to our database. No changes were made.")
            }
            if (!args[2]) {
                const usage = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .addField("Usage:", `\`${guildSettings.prefix}logs setrolechannel <#channel>\``)
                    .setFooter(`${message.author.tag} ▪️ ${d.toLocaleTimeString()}`)
                return message.channel.send(usage)
            }
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(channel => channel.type == 'text' && channel.name.toLowerCase().includes(args[2]))
            if (!channel) return message.channel.send("> :x:Invalid channel!")
            if (channel) {
                await Logs.findOneAndUpdate({
                    guildID: message.guild.id,
                }, {
                    roleChannel: channel
                })
                const success = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .setDescription(`<a:online:831898654432165888> Set the \`Role Logging\` channel to <#${channel.id}>`)
                message.channel.send(success)
            }
        }
        if (args[1] === "setmodchannel") {
            if (!logs) {
                const newLogs = await new Logs({
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    msgChannel: "None",
                    channelLog: "None",
                    roleChannel: "None",
                    modChannel: "None",
                    bypassRole: "None",
                    bypassUser: "None",
                })
                newLogs.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                return message.channel.send("We're adding your server to our database. No changes were made.")
            }
            if (!args[2]) {
                const usage = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .addField("Usage:", `\`${guildSettings.prefix}logs setmodchannel <#channel>\``)
                    .setFooter(`${message.author.tag} ▪️ ${d.toLocaleTimeString()}`)
                return message.channel.send(usage)
            }
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(channel => channel.type == 'text' && channel.name.toLowerCase().includes(args[2]))
            if (!channel) return message.channel.send("> :x:Invalid channel!")
            if (channel) {
                await Logs.findOneAndUpdate({
                    guildID: message.guild.id,
                }, {
                    modChannel: channel
                })
                const success = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .setDescription(`<a:online:831898654432165888> Set the \`Moderation Logging\` channel to <#${channel.id}>`)
                message.channel.send(success)
            }
        }
        if (args[1] === "setallchannels") {
            if (!logs) {
                const newLogs = await new Logs({
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    msgChannel: "None",
                    channelLog: "None",
                    roleChannel: "None",
                    modChannel: "None",
                    bypassRole: "None",
                    bypassUser: "None",
                })
                newLogs.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                return message.channel.send("We're adding your server to our database. No changes were made.")
            }
            if (!args[2]) {
                const usage = new Discord.MessageEmbed()
                    .setTitle("Logs")
                    .setColor(guildSettings.color)
                    .addField("Usage:", `\`${guildSettings.prefix}logs setallchannels <#channel>\``)
                    .setFooter(`${message.author.tag} ▪️ ${d.toLocaleTimeString()}`)
                return message.channel.send(usage)
            }
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(channel => channel.type == 'text' && channel.name.toLowerCase().includes(args[2]))
            if (!channel) return message.channel.send("> :x:Invalid channel!")
            if (channel) {
                await Logs.findOneAndUpdate({
                    guildID: message.guild.id,
                }, {
                    msgChannel: channel,
                    channelLog: channel,
                    roleChannel: channel,
                    modChannel: channel,
                })
                const success = new Discord.MessageEmbed()
                    .setColor(guildSettings.color)
                    .addField("Logs", `<a:online:831898654432165888> Set the \`Message Logging\` channel to <#${channel.id}>\n<a:online:831898654432165888> Set the \`Channel Logging\` channel to <#${channel.id}>\n<a:online:831898654432165888> Set the \`Role Logging\` channel to <#${channel.id}>\n<a:online:831898654432165888> Set the \`Moderatrion Logging\` channel to <#${channel.id}>`)
                message.channel.send(success)
            }
        }
        if (args[1] === "bypassuser") {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[2])
            if (!user) return message.channel.send("> :x: Invalid user!")
            await Logs.findOneAndUpdate({
                guildID: message.guild.id,
            }, {
                bypassUser: user
            })
            const success = new Discord.MessageEmbed()
                .setTitle("Logs")
                .setColor(guildSettings.color)
                .setDescription(`<a:online:831898654432165888> Set <@${user.id}> as the bypass user!`)
            message.channel.send(success)
        }
    }
}