const Discord = require('discord.js');
const fetch = require('node-fetch');
const logger = require('../../winston');
const config = require('../../config.json');
require('dotenv').config();

module.exports = {
	name: 'bitly',
	description: 'Rút gọn link bằng bit.ly',
	category: 'others',
	aliases: [],
	guildOnly: false,
	argRequired: true,
	usage: '<link>',
	execute(message, args) {
		message.delete();
		if (!process.env.BITLY_TOKEN) {
			logger.warn('No BITLY_TOKEN provided');
			return message.channel.send('Lệnh chưa sử dụng được');
		}

		const headers = {
			'Authorization': process.env.BITLY_TOKEN,
			'Content-Type': 'application/json',
		};

		const body = {
			domain: 'bit.ly',
			long_url: args[0],
		};

		fetch('https://api-ssl.bitly.com/v4/shorten', {
			method:'POST',
			headers : headers,
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(json => {
				const shortenEmbed = new Discord.MessageEmbed()
					.setColor(config.embedColors.success)
					.setTitle('Rút gọn link')
					.setDescription(`Link gốc: ${json.long_url}`)
					.setFooter('Banabot by Kuro')
					.addField('Link rút gọn:', `${json.link}`);

				logger.info(`Discord: ${message.author.id} shortened a link: ${json.long_url} into ${json.link}`);
				return message.channel.send(shortenEmbed);
			});
	},
};
