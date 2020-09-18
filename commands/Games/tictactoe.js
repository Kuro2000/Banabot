module.exports = {
	name: 'tictactoe',
	description: 'Cờ caro 3x3 với người hoặc BOT',
	category: 'games',
	aliases: [],
	guildOnly: false,
	argRequired: false,
	execute(message) {
		switch (args[0]) {
		default:
			return message.channel.send('Chưa code xong 😞');
		}
	},
};
