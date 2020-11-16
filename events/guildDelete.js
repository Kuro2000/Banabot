const logger = require('../winston');
const Guild = require('../models/guildModels');

module.exports = (client, guild) => {
	Guild.deleteOne({ guildID: guild.id }, err =>{
		if(!err) {return logger.info(`Database: Successfully deleted DB data, guildID: ${guild.id}`);}
		logger.error('Error: ' + err);
	});
};