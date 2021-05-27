const Discord = require('discord.js');
const Guild = require('../models/guild');
const Token = require('../models/tokens');
const Logs = require('../models/logs');
module.exports = async (bot) => {
    console.log("Loaded module: LOGGING successfully!")
    try {
        bot.on('channelCreate', async function (channel) {
            const guildSettings = await Guild.findOne({
                guildID: channel.guild.id
            })
            const logs = await Logs.findOne({
                guildID: channel.guild.id
            })
            if(!channel.guild.me.hasPermission('VIEW_AUDIT_LOG', 'SEND_MESSAGES')) { return; }
            const AuditLogFetch = await channel.guild.fetchAuditLogs({
                limit: 1,
                type: "CHANNEL_CREATE"
            });
            const Entry = AuditLogFetch.entries.first();
            if (logs.bypassUser !== Entry.executor.id) {
                send_log(bot, channel.guild.id, "Logs", `\`CHANNEL CREATED\`\nA channel has been created.\n\nChannel Name: <#${channel.id}>\nExecutor: ${Entry.executor.tag}`, Entry.executor.displayAvatarURL({
                    dynamic: true
                }))
            }

        })
    } catch (err) {
        console.log("Failed to load module: LOGGING!")
        console.log(err)
    }
}

async function send_log(bot, guildid, title, description, avatar) {
    try {
        const guildSettings = await Guild.findOne({
            guildID: guildid
        })
        const logs = await Logs.findOne({
            guildID: guildid
        })
        const log = new Discord.MessageEmbed()
            .setTitle(title ? title.substr(0, 256) : "\u200b")
            .setThumbnail(avatar)
            .setColor(guildSettings.color)
            .setDescription(description ? description.substr(0, 2048) : "\u200b")
            .setTimestamp()
        const logger = await bot.channels.fetch(logs.channelLog);
        logger.send(log)
    } catch (err) {
        console.log("There was an error with the module: LOGGING!")
        console.log(err)
    }
}