const Discord = require('discord.js');
const config = require('../../config.json');
const prefix = config.prefix;

module.exports = {
	name: 'help',
	description: 'Get more details on server commands',
	aliases: ['commands'],
	guildOnly: false,
	argRequired: false,
	execute(message, args) {
		// const data = [];
		const { commands } = message.client;

		if(!args.length) {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(config.embedColors.info)
				.setTitle('Commands list')
				.setDescription('**📜 Các câu lệnh hiện có trong server**')
				.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
				.addFields(
					{ name: `🙋‍♂️ **${prefix}help**`, value: 'Danh sách các lệnh' },
					{ name: `⚰️ **${prefix}role <role>**`, value: 'Set role cho thành viên, hiện có: `btcm`,`nccm` và `guest`' },
					{ name: `📊 **${prefix}stats**`, value: 'Khởi tạo và hiển thị các thông tin người dùng' },
					{ name: `💰 **${prefix}balance <câu lệnh>**`, value: 'Các lệnh về server economy, câu lệnh hiện có: `ranking` và `daily`' },
					{ name: `🗳️ **${prefix}vote <chủ đề>**`, value: 'Tạo nhanh bộ vote YES/NO' },
					{ name: `💌 **${prefix}inv**`, value: 'Tạo mã mời vào server', inline: true },
					{ name: `🦶 **${prefix}kick @user**`, value: 'Kick một người khỏi server', inline: true },
					{ name: `📝 **${prefix}report <nội dung>**`, value: 'Gửi báo cáo, góp ý server' },
					{ name: '😎 **Các lệnh admin khác**', value: `Hiện có lệnh *${prefix}send*, *${prefix}balance god*` },
				)
				.setFooter('Discord BOT by Kuro');

			return message.channel.send(helpEmbed);
		}
		else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(commandName));

			if (!command) {
				return message.reply('Không có câu lệnh này');
			}

			const helpEmbed = new Discord.MessageEmbed()
				.setColor(config.embedColors.info)
				.setTitle(`Lệnh ${command.name.toUpperCase()}`)
				.setFooter('Discord BOT by Kuro');
			if(command.aliases.length > 0) {
				helpEmbed.addField('**Aliases**', `${command.aliases.join(', ')}`);
			}
			if(command.description) {
				helpEmbed.addField('**Miêu tả**', `${command.description}`);
			}
			if(command.usage > 0) {
				helpEmbed.addField('**Cách dùng**', `${prefix}${command.name} ${command.usage}`);
			}

			return message.channel.send(helpEmbed);
		}
	},
};

