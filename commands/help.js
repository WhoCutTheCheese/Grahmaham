const Discord = require('discord.js');
module.exports = {
    name: 'help',
    description: 'List of functions and commands of the bot.',
    run: async (bot, message, args) => {
        if(!args[1]) {
            const helpMenu = new Discord.MessageEmbed()
                .setTitle("Grahmaham Help")
                .setColor(`${settings.color}`)
                .setDescription("Use `!help <command>` for more information on a command.")
            message.channel.send(helpMenu)
        }
    }
}