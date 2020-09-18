/* eslint-disable no-undef */
const logger = require('../../winston');

module.exports = {
	name: 'role',
	description: 'Set role tự động',
	category: 'nec',
	aliases: [],
	guildOnly: true,
	argRequired: true,
	usage: '<rolename>',
	execute(message) {
		if (message.member._roles.length == 0) {
			const user_role = message.content.split(' ')[1];
			// Role ID for BTCM role
			if(user_role === 'btcm') {roleID = '706915179153326100';}
			// Role ID for NCCM role
			else if(user_role === 'nccm') {roleID = '706915054284570715';}
			// Role ID for Guest role
			else if(user_role === 'guest') {roleID = '706915631064416257';}
			else{
				message.channel.send('Bạn nhập sai cú pháp 🤦‍♂️');
				return;
			}
		}
		else{
			message.channel.send('Bạn đã chọn role trước đó rồi 🤦‍♂️');
			return;
		}

		const roleAtts = message.guild.roles.cache.get(roleID);
		message.member.roles.add(roleAtts);
		message.reply('Bạn đã chọn role thành công, hãy kiểm tra các vùng chat mới theo role của bạn 🙆🙆');
		logger.info(`Discord: Successfully assigned roleID: ${message.member.roleID} to ${message.member.id}`);
	},
};