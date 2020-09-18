module.exports = {
	name: 'coinflip',
	description: 'Lật đồng xu',
	category: 'games',
	aliases: ['coin', 'flip'],
	guildOnly: false,
	argRequired: false,
	execute(message) {
		const rand = Math.floor(Math.random() * 2);
		switch (rand) {
		case 0:
			return message.reply('Heads');
		case 1:
			return message.reply('Tails');
		}
	},
};
