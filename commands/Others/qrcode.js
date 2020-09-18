module.exports = {
	name: 'qrcode',
	description: 'Chuyển nội dung đã nhập thành QR code',
	category: 'others',
	aliases: [],
	guildOnly: false,
	argRequired: true,
	execute(message) {
		return message.channel.send('Chưa code xong 😞');
	},
};
