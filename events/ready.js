const logger = require('../winston');
const config = require('../config.json');

module.exports = client => {
	client.user.setActivity(`[${config.prefix}] I'm a BOT!`);
	logger.info(`Discord: Ready to serve as ${client.user.tag}!`);
	logger.info(`Discord: Available on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users!`);
};