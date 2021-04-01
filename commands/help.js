const Discord = require('discord.js');
module.exports = {
    name: 'help',
    description: 'List of functions and commands of the bot.',
    run: async (bot, messsage, args) => {
        if(!args[1]) {
            const helpMenu = new Discord.MessageEmbed()
                .setTitle("Grahmaham Help")
                .setDescription("Yse `!help <command>` for more information on a command.")
            message.channel.send(helpMenu)
        }
    }
}