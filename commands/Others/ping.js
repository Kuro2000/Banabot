module.exports = {
	name: 'ping',
	description: 'Kiểm tra độ trễ tới BOT',
	category: 'others',
	aliases: [],
	guildOnly: false,
	argRequired: false,
	execute(message) {
		return message.channel.send('Chưa code xong 😞');
	},
};
