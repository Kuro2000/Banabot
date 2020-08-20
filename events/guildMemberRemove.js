const User = require('../models/userModels');
const config = require('../config.json');
const logger = require('../winston');

module.exports = (client, member) => {
	const channel = member.guild.channels.cache.find(ch => ch.name === config.welcomeChannel);
	if(!channel) return logger.warn('No welcome channel found');
	channel.send(`${member} đã rời khỏi server`);
	User.deleteOne({ userID: member.id }, err =>{
		if(!err) {return logger.info(`Database: Successfully deleted DB data, user: ${member.id}`);}
		logger.error('Error: ' + err);
	});
};