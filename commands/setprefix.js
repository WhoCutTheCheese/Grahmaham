const Guild = require("../models/guild");
const Discord = require('discord.js')
module.exports = {
    name: 'prefix',
    description: "Set your server's prefix.",
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send(noPermissions).then(m => m.delete({
                timeout: 10000
            }));
        };

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: "!!",
                    color: `ff5959`,
                })

                newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({
                    timeout: 10000
                }));
            }
        });

        if (!args[1]) {
            const noPrefix = new Discord.MessageEmbed()
                .setTitle("Prefix")
                .setColor(`${settings.color}`)
                .setDescription("Change the prefix for your server.")
                .addField("Current Prefix:", `\`${settings.prefix}\``)
                .addField("Change Prefix:", `\`${settings.prefix}prefix <New Prefix>\``)
                .setTimestamp()
            return message.channel.send(noPrefix).then(m => m.delete({
                timeout: 10000
            }));
        };

        if (args[1] === "reset") {
            await settings.updateOne({
                prefix: "!!"
            })
            const resetPrefix = new Discord.MessageEmbed()
                .setTitle("Prefix")
                .setColor("GREEN")
                .setDescription(":white_check_mark: Prefix reset to `!!`")
            message.channel.send(resetPrefix)
        } else {
            if (args[1].length > 3) {
                const tooLong = new Discord.MessageEmbed()
                    .setDescription(":x: This prefix is too long, please choose another.")
                    .setColor("RED")
                return message.channel.send(tooLong).then(m => m.delete({
                    timeout: 10000
                }));
            } else {
                await settings.updateOne({
                    prefix: args[1]
                });
                const setPrefix = new Discord.MessageEmbed()
                    .setTitle("Prefix")
                    .setColor(`${settings.color}`)
                    .addField("Prefix Updated", `Your guild's prefix has been updated to \`${args[1]}\``)
                    .setTimestamp()
                return message.channel.send(setPrefix).then(m => m.delete({
                    timeout: 10000
                }));
            }
        }

    }
}