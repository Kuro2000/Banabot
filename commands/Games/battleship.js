module.exports = {
	name: 'battleship',
	description: 'Game battleship chơi 2 người hoặc chơi với BOT',
	category: 'games',
	aliases: ['bs', 'bship'],
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