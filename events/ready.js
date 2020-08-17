const logger = require('../winston');

module.exports = client => {
	client.user.setActivity('Điều hòa thông minh');
	logger.info(`Discord: Ready to serve as ${client.user.tag}!`);
	logger.info(`Discord: Available on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users!`);
};