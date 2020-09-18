module.exports = {
	name: 'valorant',
	description: 'Thông tin về Valorant',
	category: 'games',
	aliases: ['val'],
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