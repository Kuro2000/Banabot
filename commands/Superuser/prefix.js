module.exports = {
	name: 'prefix',
	description: 'Thay đổi prefix',
	category: 'superuser',
	aliases: [],
	guildOnly: false,
	argRequired: true,
	execute(message) {
		return message.channel.send('Chưa code xong 😞');
	},
};
