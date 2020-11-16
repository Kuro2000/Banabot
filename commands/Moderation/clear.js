const logger = require('../../winston');

module.exports = {
	name: 'clear',
	description: 'Xóa tin nhắn của channel',
	category: 'moderation',
	aliases: [],
	guildOnly: true,
	argRequired: true,
	usage: '<số lượng> (dưới 100 tin một lần)',
	execute(message, args) {
		message.channel.bulkDelete(parseInt(args[0]))
			.then(()=>{
				message.reply(`Đã clear ${args[0]} tin nhắn`);
			})
			.catch(err =>{
				message.channel.send('ℹ Các tin nhắn cũ hơn 14 ngày sẽ không bị xóa đi');
				message.channel.send('ℹ Nếu muốn xóa toàn bộ nội dung, bạn có thể dùng tính năng **Clone Channel**');
				logger.warn('Error: ' + err);
			});
	},
};
