const mongoose = require('mongoose');
const User = require('../../models/userModels');
const Discord = require('discord.js');
const config = require('../../config.json');
const logger = require('../../winston');

module.exports = {
	name: 'stats',
	description: 'Xem thông tin cá nhân',
	category: 'economy',
	aliases: ['info'],
	guildOnly: true,
	argRequired: false,
	execute(message) {
		User.findOne({ userID:message.author.id }, (err, user)=>{
			// Create new db collections if none was found
			if(user == null) {
				user = new User({
					_id: mongoose.Types.ObjectId(),
					userID: message.author.id,
					username: message.author.username,
					role: 'default',
					balance: 0,
					level: 1,
					exp: 0,
					lastAttendance: 0,
				});

				user.save()
					.then(result => {
						logger.info(`Database: User ${message.author.id} data initiated: ${result}`);
						message.reply(' Thông tin của bạn đã được khởi tạo 🙆‍♀️, hãy nhập lại lệnh **!stats** để kiểm tra');
					})
					.catch(err => logger.error(err));

			}
			else{
				// Update user's data - WIP

				const uBalance = user.balance;
				const uExp = user.exp;
				const uLevel = user.level;

				const statEmbed = new Discord.MessageEmbed()
					.setColor(config.embedColors.info)
					.setTitle('Thông tin cá nhân')
					.setFooter('Economy system by Kuro')
					.setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
					.addFields(
						{ name: '🙋‍♂️ **Username**:', value: message.author.username },
						{ name: '💰 **Tài sản**', value: (Math.round(uBalance * 100) / 100) + '$' },
						{ name: '📝 **Cấp độ**', value: `${uLevel}: Newbie`, inline: true },
						{ name: '👑 **EXP**', value: `Exp: ${uExp}/1 tỉ`, inline: true },
					);

				message.channel.send(statEmbed);
			}
		});
	},
};
