const Discord = require('discord.js');
const Guild = require("../models/guild");
const Tokens = require("../models/tokens");
module.exports = {
    name: "logs",
    run: async (bot, message, args) => {
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
                .setDescription(`For more information on the \`logs\` sub commands use \`${guildSettings.prefix}logs help <sub command>\``)
            message.channel.send(logsHelp)
        }
    }
}