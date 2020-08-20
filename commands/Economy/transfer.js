const User = require('../../models/userModels');
const Discord = require('discord.js');
const config = require('../../config.json');
const logger = require('../../winston');

module.exports = {
	name: 'transfer',
	description: 'Transfer money between users',
	aliases: [],
	guildOnly: true,
	argRequired: true,
	usage: '<amount> <reason> <mention>',
	execute(message, args) {
		// Check for admin permissions
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.reply('🚫 Chỉ admin mới có quyền thực hiện lệnh này 🚫');
		}

		if(args.length < 3 || !args[0] || !args[1] || !message.mentions.members.first() || isNaN(args[0])) {
			return message.reply('Bạn vẫn chưa nhập đúng lệnh 🤦‍♂️');
		}
		// const senderID = message.author.id;
		const receiverID = message.mentions.members.first().id;
		User.findOne({ userID:receiverID }, (err, user)=>{
			if(user == null) { return message.reply('🚫 User không tồn tại 🚫');}
			user.balance += parseInt(args[0]);
			user.save()
				.then(result => {
					let reason = '';
					for (let i = 1; i < args.length - 1; i++) {
						reason = reason + args[i] + ' ';
					}
					logger.info(`Discord: Balance changed, ID: ${result.userID}, Amount: ${args[0]}, Reason: ${reason}`);
					const receipt = new Discord.MessageEmbed()
						.setColor(config.embedColors.success)
						.setFooter('💰 Economy system by Kuro')
						.addFields(
							{ name: '**Username**', value: message.mentions.members.first(), inline: true },
							{ name: '**Số tiền**', value: args[0] + ' vnđ', inline: true },
							{ name: '**Lí do**', value: reason, inline: true },
						);
					message.channel.send(receipt);
				})
				.catch(err => logger.error(err));
		});
	},
};
