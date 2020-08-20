const mongoose = require('mongoose');
const Report = require('../../models/reportModels');
const logger = require('../../winston');

module.exports = {
	name: 'report',
	description: 'Feedback to improve the BOT 🤖',
	aliases: ['r', 'feedback'],
	guildOnly: false,
	argRequired: true,
	usage: '<content>',
	execute(message, args) {
		let content = '';
		args.forEach(arg => {
			content += (arg + ' ');
		});
		const report = new Report({
			_id: mongoose.Types.ObjectId(),
			guildID: message.guild.id,
			userID: message.author.id,
			username: message.author.username,
			report: content,
			time: message.createdAt,
		});
		report.save()
			.then(result => {
				logger.info(`Database: Report by ${message.author.id} collected: ${result}`);
				message.reply('Báo cáo đã được ghi nhận 📩');
			})
			.catch(err => logger.error(err));

	},
};