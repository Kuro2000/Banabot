const Discord = require('discord.js');
const config = require('../../config.json');
const prefix = config.prefix;


module.exports = {
	name: 'help',
	description: 'Danh sách commands hiện có',
	category: 'general',
	aliases: ['commands'],
	guildOnly: false,
	argRequired: false,
	usage: '<danh mục/câu lệnh>',
	execute(message, args) {
		const { commands } = message.client;

		if(!args.length) {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(config.embedColors.info)
				.setTitle('Trợ giúp commands')
				.setDescription('**Xem hướng dẫn chi tiết từng câu lệnh bằng **' + '`' + prefix + 'help <lệnh>`')
				.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
				.addFields(
					{ name: '🏠General', value: '`' + prefix + 'help general`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Các lệnh cơ bản của server\')', inline: true },
					{ name: '🙆‍♂️Moderation', value: '`' + prefix + 'help moderation`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Các lệnh quản lý member\')', inline: true },
					{ name: '💰Economy', value: '`' + prefix + 'help economy`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Các lệnh về hệ thống Economy\')', inline: true },
					{ name: '🎮Games', value: '`' + prefix + 'help games`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Minigame của server\')', inline: true },
					{ name: '😂Memes', value: '`' + prefix + 'help memes`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Máy đẻ memes\')', inline: true },
					{ name: '🔈Voices', value: '`' + prefix + 'help voices`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Các lệnh voice\')', inline: true },
					{ name: '🛠Others', value: '`' + prefix + 'help others`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Các lệnh khác\')', inline: true },
				)
				.setFooter('Banabot by Kuro');
			if (message.author.id == config.ownerID) {
				helpEmbed.addFields(
					{ name: 'NEC', value: '`' + prefix + 'help nec`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Only NEC\')', inline: true },
					{ name: '⚙Superuser', value: '`' + prefix + 'help superuser`\n' + '[Mô tả](https://github.com/Kuro2000/Banabot \'Chỉ owner mới được sử dụng\')', inline: true },
				);
			}
			return message.channel.send(helpEmbed);
		}

		// Get help about specific command "help <arguments>"
		else {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(config.embedColors.info)
				.setFooter('Banabot by Kuro');

			// By Categories
			const categories = ['general', 'moderation', 'economy', 'games', 'memes', 'voices', 'others'];
			if (categories.includes(args[0])) {
				helpEmbed.setTitle(`Các lệnh nhóm ${args[0].toUpperCase()}`);
				let data = '';

				commands.forEach(command => {
					if(command.category == args[0]) {
						const commandString = '`' + command.name + '`, ';
						data += commandString;
					}
				});
				data = data.slice(0, -2);
				helpEmbed.addField('Danh sách: ', data);
				return message.channel.send(helpEmbed);
			}

			// By Commands name
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(commandName));

			if (!command) {
				return message.reply('Không có câu lệnh này');
			}

			helpEmbed.setTitle(`Lệnh ${prefix}${command.name}`);
			if(command.aliases.length > 0) {
				helpEmbed.addField('**Thay thế**', `${command.aliases.join(', ')}`);
			}
			if(command.description) {
				helpEmbed.addField('**Miêu tả**', `${command.description}`);
			}
			if(command.usage) {
				helpEmbed.addField('**Cách dùng**', '`' + `${prefix}${command.name} ${command.usage}` + '`');
			}
			// if(command.cooldown) {
			// 	helpEmbed.addField('**Cooldowns**', '5s');
			// }
			// if(command.permissions) {
			// 	helpEmbed.addField('**Permissions**', 'Admin');
			// }


			return message.channel.send(helpEmbed);
		}
	},
};

