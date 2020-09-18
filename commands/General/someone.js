// WIP mention a person from a provided role

module.exports = {
	name: 'someone',
	description: 'Mention ngẫu nhiên một người',
	category: 'general',
	aliases: [],
	guildOnly: true,
	argRequired: false,
	execute(message) {
		console.log(message.channel.messages);
		const list = [];
		message.guild.members.cache.forEach(member => {
		// Check and remove BOT accounts, admin accounts
			if(!member.user.bot && !member.hasPermission('ADMINISTRATOR')) {
				list.push(member.user.id);
			}
		});

		const random = Math.floor(Math.random() * list.length);
		message.channel.send(`<@${list[random]}> là người được chọn 🎉🎉`);
	},
};