module.exports = {
	name: 'broadcast',
	description: 'Broadcast a message',
	aliases: ['b'],
	guildOnly: false,
	argRequired: false,
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send('Pong.');
	},
};