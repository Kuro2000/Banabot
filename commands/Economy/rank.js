const User = require('../../models/userModels');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'rank',
	description: 'Xem Bảng xếp hạng dựa trên coin',
	category: 'economy',
	aliases: ['ranking', 'leaderboards', 'r', 'l'],
	guildOnly: true,
	argRequired: false,
	execute(message) {
		User.find({}, null, { sort:{ balance:-1 } }, (err, users)=>{
			let content = '';
			let i = 0;
			users.forEach(user=>{
				content += `${i + 1}. ${user.username}: ${(Math.round(user.balance * 100) / 100)} vnđ\n`;
				i += 1;
			});
			const ranking = new Discord.MessageEmbed()
				.setColor(config.embedColors.info)
				.setTitle('**🎖️🎖️ Top các đại gia 🎖️🎖️**')
				.setThumbnail(message.guild.iconURL)
				.setDescription(content)
				.setFooter('💰 Economy system by Kuro');

			message.channel.send(ranking);
		});
	},
};