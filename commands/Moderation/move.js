module.exports = {
	name: 'move',
	description: 'Chuyển tin nhắn sang channel khác',
	category: 'moderation',
	aliases: [],
	guildOnly: true,
	argRequired: true,
	execute(message, args) {
		switch (args[0]) {
		default:
			return message.channel.send('Chưa code xong 😞');
		}
	},
};
