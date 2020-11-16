const logger = require('../../winston');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'test',
	description: 'Test function',
	category: 'superuser',
	aliases: [],
	guildOnly: false,
	argRequired: true,
	usage: '<test>',
	// eslint-disable-next-line no-unused-vars
	execute(message, client, args) {
		switch (args[0]) {
		case '1':
			logger.warn('guildMemberAdd');
			client.emit('guildMemberAdd', message.member);
			break;

		case '2':
			logger.warn('guildMemberRemove');
			client.emit('guildMemberRemove', message.member);
			break;

		case '3':
			logger.warn('guildCreate');
			client.emit('guildCreate', message.guild);
			break;

		case '4':
			/* eslint-disable no-case-declarations */
			const roleEmbed = new Discord.MessageEmbed()
				.setColor(config.embedColors.info)
				.setTitle('Chọn Ban mảng của bạn')
				.setDescription('Chọn Emoji tương ứng để được set vào role của Ban mình nhé!')
				.setFooter('Banabot by Kuro')
				.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
				.addFields(
					{ name: '**Chuyên môn**', value: '🎮 Toàn trùm game', inline:true },
					{ name: '**Truyền thông - Kĩ thuật**', value:'🔈 Ban văn vở', inline:true },
					{ name: '**Tổ chức - Sự kiện**', value: '🙋‍♂️ Pr0 Payl4k', inline:true },
					{ name: '**Đối ngoại**', value: '💰 Ban giàu', inline:true },
				);

			message.channel.send(roleEmbed);
			break;
		}
	},
};