const mongoose = require('mongoose');
const User = require('../models/userModels');
const config = require('../config.json');
const logger = require('../winston');

module.exports = (client, member) => {
	const channel = member.guild.channels.cache.find(ch => ch.name === config.welcomeChannel);
	if (!channel) return logger.warn('No welcome channel found');

	// Custom DM only used in the guild with id inputted
	if(client.guilds.id == config.NECGuildID) {
		channel.send(`Chào mừng bạn đến với server, ${member}, một chú BOT 🤖 đã PM cho bạn cách thức để gia nhập server, hãy làm theo hướng dẫn`);
		member.send('Hãy chọn Role của bạn bằng cách **Nhập lệnh sau** vào kênh text *bot-commands*:\nNhập ```!role btcm```nếu bạn thuộc tiểu ban **Biên tập Chuyên môn** ⚰️⚰️\n```!role nccm```nếu bạn thuộc tiểu ban **Nghiên cứu và Ứng dụng Chuyên môn** ⚰️⚰️\n```!role guest```nếu bạn là Khách 🐵🐵\nBạn nên check Pinned messages của box chat *bot-commands* để biết thêm về một số lệnh khác');
	}
	else{
		// Send the welcome message, mentioning the member
		channel.send(`Chào mừng ${member.username} đến với server 🤖🤖`);
	}

	// Save info to DB
	const user = new User({
		_id: mongoose.Types.ObjectId(),
		userID: member.id,
		username: member.username,
		role: 'default',
		balance: 0,
		level: 1,
		exp: 0,
		lastAttendance: 0,
	});

	user.save()
		.then(result => {
			logger.info('Database: successfully init DB data, user: ' + result.userID);
		})
		.catch(err => logger.error(err));

};