const Discord = require('discord.js');
const Guild = require("../models/guild");
module.exports = {
    name: "serverinfo",
    run: async (bot, message, args) => {
        const gSettings = await Guild.findOne({
            guildID: message.guild.id
        })
        message.guild.members.fetch().then(fetchedMembers => {
            const totalMembers = fetchedMembers

            function checkDays(date) {
                let now = new Date();
                let diff = now.getTime() - date.getTime();
                let days = Math.floor(diff / 86400000);
                return days + (days == 1 ? " day" : " days") + " ago";
            };
            let verifLevel
            if (message.guild.verificationLevel == "NONE") { verifLevel = "None" }
            if (message.guild.verificationLevel == "LOW") { verifLevel = "Low" }
            if (message.guild.verificationLevel == "MEDIUM") { verifLevel = "Medium" }
            if (message.guild.verificationLevel == "HIGH") { verifLevel =  "(╯°□°）╯︵  ┻━┻" }
            if (message.guild.verificationLevel == "VERY_HIGH") { verifLevel =  "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻" }
            let region = {
                "eu-central": ":flag_eu: Central Europe",
                "singapore": ":flag_sg: Singapore",
                "us-central": ":flag_us: U.S. Central",
                "sydney": ":flag_au: Sydney",
                "us-east": ":flag_us: U.S. East",
                "us-south": ":flag_us: U.S. South",
                "us-west": ":flag_us: U.S. West",
                "eu-west": ":flag_eu: Western Europe",
                "vip-us-east": ":flag_us: VIP U.S. East",
                "london": ":flag_gb: London",
                "amsterdam": ":flag_nl: Amsterdam",
                "hongkong": ":flag_hk: Hong Kong",
                "russia": ":flag_ru: Russia",
                "southafrica": ":flag_za:  South Africa"
            };
            console.log(message.guild.verificationLevel)
            const serverinfo = new Discord.MessageEmbed()
                .setAuthor(message.guild.name)
                .setThumbnail(message.guild.iconURL())
                .setColor(gSettings.color)
                .addField("Name", message.guild.name, true)
                .addField("ID", message.guild.id, true)
                .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
                .addField("Region", `${region[message.guild.region]}`)
                .addField("Members", `${totalMembers.size}`)
                .addField("Emojis", `${message.guild.emojis.cache.size}`, true)
                .addField("Channels", `${message.guild.channels.cache.size}`, true)
                .addField("Roles", `${message.guild.roles.cache.size}`, true)
                .addField("Verification Level", `${verifLevel}`)
                .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`)
            message.channel.send(serverinfo)
        });
        // message.guild.members.fetch().then(fetchedMembers => {
        //     const totalMembers = fetchedMembers

        //     function checkDays(date) {
        //         let now = new Date();
        //         let diff = now.getTime() - date.getTime();
        //         let days = Math.floor(diff / 86400000);
        //         return days + (days == 1 ? " day" : " days") + " ago";
        //     };
        //     let region = {
        //         "eu-central": ":flag_eu: Central Europe",
        //         "singapore": ":flag_sg: Singapore",
        //         "us-central": ":flag_us: U.S. Central",
        //         "sydney": ":flag_au: Sydney",
        //         "us-east": ":flag_us: U.S. East",
        //         "us-south": ":flag_us: U.S. South",
        //         "us-west": ":flag_us: U.S. West",
        //         "eu-west": ":flag_eu: Western Europe",
        //         "vip-us-east": ":flag_us: VIP U.S. East",
        //         "london": ":flag_gb: London",
        //         "amsterdam": ":flag_nl: Amsterdam",
        //         "hongkong": ":flag_hk: Hong Kong",
        //         "russia": ":flag_ru: Russia",
        //         "southafrica": ":flag_za:  South Africa"
        //     };
        //     const serverinfo = new Discord.MessageEmbed()
        //         .setAuthor(message.guild.name)
        //         .setThumbnail(message.guild.iconURL())
        //         .addField("Name", message.guild.name, true)
        //         .addField("ID", message.guild.id, true)
        //         .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        //         .addField("Region", region[message.guild.region])
        //         .addField("Members", totalMembers.size)
        //         .addField("Emojis", message.guild.emojis.cache.size, true)
        //         .addField("Channels", message.guild.channels.cache.size, true)
        //         .addField("Roles", message.guild.roles.cache.size, true)
        //         // .addField("Verification Level", `${verifLevel}`)
        //         .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`)
        //     message.channel.send(serverinfo)
        // });
    }
}