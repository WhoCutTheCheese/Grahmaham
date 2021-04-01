const Discord = require('discord.js');
const settings 
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
                    prefix: `${settings.prefix}`,
                    color: `${settings.color}`,
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
                .setDescription("Use `!help <command>` for more information on a command.")
            message.channel.send(helpMenu)
        }
    }
}