const Discord = require('discord.js');
const Guild = require('../models/guild');
const Tokens = require('../models/tokens');
module.exports = {
    name: "check",
    description: "Check if the bots permissions are setup.",
    run: async (bot, message, args) => {
        const d = new Date();
        const gSettings = await Guild.findOne({
            guildID: message.guild.id
        });
        const tSettings = await Tokens.findOne({
            guildID: message.guild.id
        });
        let embedLinks
        if (message.guild.me.hasPermission('EMBED_LINKS')) { 
            embedLinks = "<a:online:831898654432165888>"
        } else if (!message.guild.me.hasPermission("EMBED_LINKS")) { embedLinks = "<a:down:831900256827605043>" }
        let viewAuditLogs
        if (message.guild.me.hasPermission('VIEW_AUDIT_LOG')) { 
            viewAuditLogs = "<a:online:831898654432165888>"
        } else if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG")) { viewAuditLogs = "<a:down:831900256827605043>" }

        let check = new Discord.MessageEmbed()
            .setTitle("Check")
            .setColor(gSettings.color)
            .setDescription("<a:down:831900256827605043> = Missing Permission\n<a:online:831898654432165888> = Has Permission\n\nTo finish setting up the bot all permissions must have a \"<a:online:831898654432165888>\" next to them.")
            .setFooter(`${message.author.tag} ▪️ ${d.toLocaleTimeString()}`, message.author.displayAvatarURL({ dynamic: true }))
            .addField(`Embed Links: ${embedLinks}`, `**View Audit Logs:** ${viewAuditLogs}`)
        message.channel.send(check)
    }
}
