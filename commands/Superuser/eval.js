const logger = require('../../winston');

module.exports = {
	name: 'eval',
	description: 'Chạy lệnh javascipt',
	category: 'superuser',
	aliases: [],
	guildOnly: false,
	argRequired: true,
	execute(message, args) {
		const clean = text => {
			if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
			else {return text;}
		};

		const code = args.join(' ');

		let evaled = eval(code);

		if(typeof evaled !== 'string') evaled = require('util').inspect(evaled);
		logger.warn(`Discord: ${message.author.id} issued eval command, code: ${code}`);
		return message.channel.send(clean(evaled), { code:'xl' });
	},
};
