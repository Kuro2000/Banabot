module.exports = {
	name: 'broadcast',
	description: 'Truyền tin nhắn',
	category: 'superuser',
	aliases: ['b'],
	guildOnly: false,
	argRequired: false,
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send('Pong.');
	},
};