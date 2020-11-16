const logger = require('../winston');
const Guild = require('../models/guildModels');
const mongoose = require('mongoose');
const config = require('../config.json');

module.exports = (client, guild) => {
	// Create default text channels with READ_ONLY permission
	if (!guild.channels.cache.find(c => c.name == '📜 Khu vực BOT 📜')) {
		guild.channels.create('📜 Khu vực BOT 📜', {
			type: 'category',
			reason: 'Basic neccessities for Banabot',
		})
			.then(botCategory =>{
				config.botChannels.forEach(channel => {
					guild.channels.create(channel.name, {
						type: 'text',
						parent: botCategory.id,
					})
						.then(createdChannel =>{
							if(channel.description) createdChannel.setTopic(channel.description);
							if(channel.isReadonly) {
								createdChannel.overwritePermissions([{
									id: guild.roles.everyone.id,
									deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES'],
								}]);
							}
						});
				});

				botCategory.setPosition(0);
			});
	}

	// Save guild data to DB
	Guild.findOne({ guildID: guild.id }, (err, tmpguild) => {
		if(!tmpguild) {
			tmpguild = new Guild({
				_id: mongoose.Types.ObjectId(),
				guildID: guild.id,
				guildName: guild.name,
				ownerID: guild.ownerID,
				createdTimestamp: Date.now(),
				region: guild.region,
			});

			tmpguild.save()
				.then(result =>{
					logger.info('Database: Successfully initiated DB data, guildID: ' + result.guildID);
				})
				.catch(err => logger.error(err));
		}
	});
};