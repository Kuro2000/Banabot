module.exports = {
	name: 'clashroyale',
	description: 'Xem các thông tin về Clash Royale',
	category: 'games',
	aliases: ['cr'],
	guildOnly: false,
	argRequired: true,
	usage: '<command>',
	execute(message, args) {
		switch (args[0]) {
		default:
			return message.channel.send('Chưa code xong 😞');
		}
	},
};