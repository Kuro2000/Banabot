module.exports = {
	name: 'bitly',
	description: 'Rút gọn link bằng bit.ly',
	category: 'others',
	aliases: [],
	guildOnly: false,
	argRequired: true,
	execute(message) {
		switch (args[0]) {
		default:
			return message.channel.send('Chưa code xong 😞');
		}
	},
};
