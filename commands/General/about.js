const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'about',
	description: 'Thông tin về Banabot',
	category: 'general',
	aliases: [],
	guildOnly: false,
	argRequired: false,
	execute(message) {
		const aboutEmbed = new Discord.MessageEmbed()
			.setColor(config.embedColors.info)
			.setTitle('Banabot')
			.addFields(
				{ name:'Thêm BOT vào Guild của bạn', value:'[Click here](https://discord.com/api/oauth2/authorize?client_id=706889625305743503&permissions=8&scope=bot \'Link\')' },
			)
			.setFooter('Banabot by Kuro');

		message.channel.send(aboutEmbed);
	},
};
