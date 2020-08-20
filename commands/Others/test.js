module.exports = {
	name: 'test',
	description: 'Test function',
	aliases: [],
	guildOnly: false,
	argRequired: true,
	usage: '<test>',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send('Pong.');
	},
};