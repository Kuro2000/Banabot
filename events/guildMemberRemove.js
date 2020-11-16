const User = require('../models/userModels');
const config = require('../config.json');
const logger = require('../winston');

module.exports = (client, member) => {
	const channel = member.guild.channels.cache.find(ch => ch.name === config.botChannels[0].name);
	if(!channel) return logger.warn('No welcome channel found');

	// Ignore BOTs
	if(member.bot) return;

	channel.send(`${member} đã rời khỏi server`);

	if(!process.env.MONGO_URI) return logger.warn('Database: No URI provided');

	// Remove guildID from User DB
	User.findOne({ userID: member.id }, (err, user) =>{
		if(err) return logger.error(`Database: ${err}`);
		if(!user) return logger.warn(`Database: User ${member.id} not found`);

		let guildIndex = -1;
		for (let i = 0; i <= user.guildList.length; i++) {
			if(user.guildList[i].guildID == member.guild.id) {
				guildIndex = i;
				break;
			}
		}
		user.guildList.splice(guildIndex, 1);

		user.save()
			.then(result => {
				logger.info(`Database: successfully remove Guild ID ${member.guild.id} DB data, user: ${result.userID}`);
			})
			.catch(err => logger.error(err));
	});
};