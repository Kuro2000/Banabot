const logger = require('../../winston');


module.exports = {
	name: 'invite',
	description: 'Create server invite link',
	aliases: ['inv', 'i', 'ivt'],
	guildOnly: true,
	argRequired: false,
	execute(message) {
		message.channel.createInvite({
			maxAge: 86400,
			unique: true,
		})
			.then(invite => {
				logger.warn(`Discord: ${message.author.id} created invite link for GuildID ${message.guild.id}: ${invite.code}`);
				message.reply(`🧾 Link invite: https://discord.gg/${invite.code}`);
			});
	},
};
