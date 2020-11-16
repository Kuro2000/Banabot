const QRCode = require('qrcode');
const Canvas = require('canvas');
const Discord = require('discord.js');
const logger = require('../../winston');
const config = require('../../config.json');

module.exports = {
	name: 'qrcode',
	description: 'Chuyển nội dung đã nhập thành QR code',
	category: 'others',
	aliases: ['qr'],
	guildOnly: false,
	argRequired: true,
	usage: '<nội dung>',
	execute(message, args) {
		message.delete();

		const canvas = Canvas.createCanvas(1000, 1000);
		QRCode.toCanvas(canvas, args[0], { width:500, height:500, margin:2 }, (err =>{
			if(err) throw logger.error(err);

		}));

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'qrcode.png');
		const qrEmbed = new Discord.MessageEmbed()
			.attachFiles(attachment)
			.setColor(config.embedColors.success)
			.setTitle('Chuyển mã QR')
			.setDescription('Nội dung: ' + '``' + args[0] + '``')
			.setFooter('Banabot by Kuro')
			.setImage('attachment://qrcode.png');
			// .addField('Link rút gọn:', `${json.link}`)

		logger.info('Discord: QR Code generated');
		return message.channel.send(qrEmbed);
	},
};