const config = require('../config.json');
const logger = require('../winston');

// Embed visualizer link: https://leovoel.github.io/embed-visualizer/

const prefix = config.prefix;
module.exports = (client, message) => {
	// Return none if prefix not detected or if author is also a bot
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Return none if the command is not found
	if(!command) return;

	// Check if the command require arguments
	if (command.argRequired && !args.length) {
		let reply = 'Nhập lệnh ``!help`` để xem lại cú pháp';
		if(command.usage) {
			reply += `\nCách sử dụng đúng: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	// Check if the command work in DMs
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Lệnh không khả dụng trong DMs');
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		logger.error(error);
		message.reply('Có lỗi xảy ra, hãy thử lại');
	}
};