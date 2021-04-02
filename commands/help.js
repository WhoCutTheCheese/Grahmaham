const Discord = require('discord.js');
const Guild = require("../models/prefix"); 
module.exports = {
    name: 'help',
    description: 'List of functions and commands of the bot.',
    run: async (bot, message, args) => {
        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: `!!`,
                    color: "00ff7b",
                })

                newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({
                    timeout: 10000
                }));
            }
        });
        if(!args[1]) {
            const helpMenu = new Discord.MessageEmbed()
                .setTitle("Grahmaham Help")
                .setColor(`${settings.color}`)
                .setDescription(`Use \`${settings.prefix}help <command>\` for more information on a command.`)
                .addField("Information", `\`${settings.prefix}help\`, \`${settings.prefix}serverinfo\`, \`${settings.prefix}userinfo\``)
                .addField("Utility", `\`${settings.prefix}prefix\`, \`${settings.prefix}logs\``)
                .addField("Premium", `\`${settings.prefix}premium\`, \`${settings.prefix}setcolor\``)
                .setFooter(`${message.author.tag} - ${settings.guildName}`)
            message.channel.send(helpMenu)
        } else if (args[1] === "help") {
            const helpInfo = new Discord.MessageEmbed()
                .setTitle("Help Information")
                .setColor(settings.color)
                .setDescription("Information on the `HELP` command.")
                .addField("Permissions:", "`EVERYONE`")
                .addField("Command Details:", "Displays every command available in your server.")
                .addField("Usage:", `\`${settings.prefix}help [Command]\``)
                .setFooter(`${message.author.tag} - ${settings.guildName}`)
            message.channel.send(helpInfo)
        } else if (args[1] === "prefix") {
            const helpInfo = new Discord.MessageEmbed()
                .setTitle("Help Information")
                .setColor(settings.color)
                .setDescription("Information on the `PREFIX` command.")
                .addField("Permissions:", "`MANAGE_SERVER`")
                .addField("Command Details:", "Change the bot's prefix for your server.")
                .addField("Usage:", `\`${settings.prefix}prefix <New Prefix/Reset>\``)
                .setFooter(`${message.author.tag} - ${settings.guildName}`)
            message.channel.send(helpInfo)
        } else if (args[1] === "logs") {
            const helpInfo = new Discord.MessageEmbed()
                .setTitle("Help Information")
                .setColor(settings.color)
                .setDescription("Information on the `logs` command.")
                .setDescription("SOON™️")
                .addField("Permissions:", "`MANAGE_SERVER`")
                .addField("Command Details:", "Set a log channel and edit and customize logs.")
                .addField("Usage:", `\`${settings.prefix}logs\` \n \n\`setmessagechannel <#channel> \nsetchanneleditchannel <#channel> \nsetrolechannel <#channel> \nsetbanchannel <#channel>\``)
                .setFooter(`${message.author.tag} - ${settings.guildName}`)
            message.channel.send(helpInfo)
        }
    }
}