module.exports = {
	name: 'battleship',
	description: 'A Two player mini battleship game',
	aliases: ['bs,bship'],
	guildOnly: false,
	argRequired: true,
	usage: '<command>',
	execute(message, args) {
		switch (args[0]) {
		default:
			return message.reply('Nhập sai cú pháp');
		}
	},
};