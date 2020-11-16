const mongoose = require('mongoose');
const User = require('../models/userModels');
const config = require('../config.json');
const logger = require('../winston');

module.exports = (client, member) => {
	const channel = member.guild.channels.cache.find(ch => ch.name === config.botChannels[0].name);
	if (!channel) logger.warn('No welcome channel found');

	// Ignore BOTs
	if(member.bot) return;

	// Send the welcome message, mentioning the member
	channel.send(`Chào mừng <@${member.id}> đến với server 🤖🤖`);

	// Save info to DB
	if(!process.env.MONGO_URI) return logger.warn('Database: No URI provided');
	User.findOne({ userID: member.user.id }, (err, user) => {
		if(err) {return logger.error(`Database: ${err}`);}

		if(!user) {
			user = new User({
				_id: mongoose.Types.ObjectId(),
				userID: member.id,
				username: member.user.username,
			});
		}

		// Check if user already existed in DB
		for (let i = 0; i <= user.guildList.length; i++) {
			if(user.guildList[i] != null && user.guildList[i].guildID == member.guild.id) return;
		}

		user.guildList.push({
			guildID: member.guild.id,
			joinedTimestamp: Date.now(),
		});

		user.save()
			.then(result => {
				logger.info(`Database: successfully added Guild ID ${member.guild.id} DB data, user: ${result.userID}`);
			})
			.catch(err => logger.error(err));


	});

};