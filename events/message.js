const Discord = require('discord.js');
const config = require('../config.json');
const logger = require('../winston');

// Embed visualizer link: https://leovoel.github.io/embed-visualizer/

const prefix = config.prefix;
module.exports = (client, message) => {
	// Return none if prefix not detected or if author is also a bot
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Also return if commands not issued in #bot-commands channel, ignore admins
	if (!message.member.hasPermission('ADMINISTRATOR') && message.channel.name != config.botChannels[1].name) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Return none if the command is not found
	if(!command) return;

	// Check the availability of Database-related commands (Specifically Economy commands)
	if(!process.env.MONGO_URI && command.category === 'economy') {
		logger.warn('Database: No URI provided');
		return message.channel.send('Chưa có Database');
	}

	// Check for owner ID if commands in the Superuser category is issued
	if(command.category === 'superuser' && message.author.id != config.ownerID) {
		return message.channel.send('Bạn không có quyền thực hiện lệnh trên');
	}

	// Author's Supportted server only
	if (command.category === 'nec' && message.guild.id != config.NECGuildID) return message.channel.send('Server không hỗ trợ lệnh này');

	// Moderator permissions check
	if (command.category === 'moderation' && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bạn không có quyền thực hiện lệnh trên');

	// Not available yet
	if (command.category === 'economy') return message.channel.send('Chưa dùng được đâu 😢');

	// Check if the command require arguments
	if (command.argRequired && !args.length) {
		// Show the usage if specified
		const argEmbed = new Discord.MessageEmbed()
			.setColor(config.embedColors.info)
			.setTitle('Sai cú pháp')
			.setFooter('Banabot by Kuro');

		if(command.usage) {
			const reply = `${prefix}${command.name} ${command.usage}`;
			argEmbed.setDescription('Cách sử dụng đúng: ' + '``' + reply + '``');
		}

		return message.channel.send(argEmbed);
	}

	// Check if the command work in DMs
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Lệnh không khả dụng trong DMs');
	}

	// Try executing the command when all conditions are fullfiled
	try {
		if(command.name == 'test') {
			return command.execute(message, client, args);
		}

		command.execute(message, args);
	}
	catch (error) {
		logger.error(error);
		message.reply('Có lỗi xảy ra, hãy thử lại');
	}
};