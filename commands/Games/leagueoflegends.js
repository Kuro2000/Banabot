module.exports = {
	name: 'leagueoflegends',
	description: 'Xem các thông tin trong LoL',
	category: 'games',
	aliases: ['lol'],
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