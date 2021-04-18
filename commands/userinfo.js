const Discord = require('discord.js');
const Guild = require('../models/guild');

module.exports = {
	name: 'userinfo',
	description: 'Get the info of a user of choise.',
	run: async(bot, message, args) => {
		let user = message.mentions.members.first() || message.guild.members.cache.get(args[1])
		if (!user) return
		const embed = new Discord.MessageEmbed()
			.setThumbnail(user.user.displayAvatarURL({dynamic: true}))
			.setColor(user.displayHexColor)
			.setTitle(user.user.username)
			.setTimestamp()
			.setDescription(`<@!${user.id}>`)
			.addField('User Tag:', user.user.tag, true);
		if (user.user.tag !== message.author.tag) {
			embed.setFooter(`Information requested by ${message.author.username}`);
		}
		// Status
	if (user.presence.activities[0]) {
			if (user.presence.activities[0].state === null) {
				embed.addField('Status', 'No status set', true);
			}else {
				embed.addField('Status', user.presence.activities[0].state, true);
			}
		}else {
			embed.addField('Status', 'No status set', true);
		}
		// id
		embed.addField('User ID', user.id, true);
		// Created / joined
		embed.addField('\nJoined Server', new Date(user.joinedTimestamp).toLocaleDateString(), true);
		embed.addField('Created Discord Account', `${new Date(user.user.createdTimestamp).toLocaleDateString()}`, true);
		// roles
		const everyone = message.guild.roles.everyone;
		const roles = user.roles.cache.filter(r => r.id !== everyone.id).array();
		// m.HelpMePlease();
		if (roles && !roles.length <= 25 && roles.length !== 1 && user.roles.cache.size !== 0 && roles.length !== 0) {
			embed.addField(`Roles [${user.roles.cache.size - 1}]:`, roles.join('\n'));
		}else if (user.roles.cache.size - 1 && user.roles.cache.size !== 0) {
			embed.addField('Role info:', `<@&${user.roles.highest.id}> [${user.roles.cache.size - 1} total role(s)]`);
		}else {
			embed.addField('Total Roles', '*Cricket noises* (0)');
		}
		// send
		message.channel.send(embed);
	},
};