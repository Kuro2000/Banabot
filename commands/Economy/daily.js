const User = require('../../models/userModels');
const Discord = require('discord.js');
const ms = require('parse-ms');
const config = require('../../config.json');
const logger = require('../../winston');

module.exports = {
	name: 'daily',
	description: 'Lĩnh lương dựa theo level',
	category: 'economy',
	aliases: ['d'],
	guildOnly: true,
	argRequired: false,
	execute(message) {
		// Bot only listen to specified channel to avoid spamming
		if(message.channel.name != config.botChannel) { return message.channel.send('Lệnh daily chỉ dùng được ở #bot-commands'); }
		User.findOne({ userID:message.author.id }, (err, user)=>{
			if(user == null) { return message.reply('🚫User không tồn tại, nhập **!stats** để tạo thông tin🚫');}
			const lastAttendance = Date.parse(user.lastAttendance);
			if (86400000 - (Date.now() - lastAttendance) > 0) {
				const time = ms(86400000 - (Date.now() - lastAttendance));
				message.channel.send(`Hãy đợi **${time.hours}h ${time.minutes}m ${time.seconds}s** để nhận daily!`);
			}
			else{
				user.balance += 200;
				user.lastAttendance = Date.now();

				user.save()
					.then(result=>{
						logger.info(`Discord: ${result.userID} claimed daily balance`);
						const dailyEmbed = new Discord.MessageEmbed()
							.setColor(config.embedColors.success)
							.setDescription('**Lương hàng ngày**')
							.setThumbnail('https://i.ytimg.com/vi/Ajxj6chgUI4/hqdefault.jpg')
							.addField('Số tiền', 200 + ' vnđ')
							.setFooter('💰 Economy system by Kuro');

						message.channel.send(dailyEmbed);
					})
					.catch(err => logger.error(err));
			}
		});

	},
};