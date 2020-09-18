module.exports = {
	name: 'about',
	description: 'Thông tin về Banabot',
	category: 'general',
	aliases: [],
	guildOnly: false,
	argRequired: false,
	execute(message) {
		return message.channel.send('Chưa code xong 😞');
	},
};
