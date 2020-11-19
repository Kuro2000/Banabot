const mongoose = require('mongoose');
const User = require('../models/userModels');
const config = require('../config.json');
const logger = require('../winston');
const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = async (client, member) => {
	logger.info(`Discord: guildMemberAdd event triggered, id: ${member.id}`);

	const channel = member.guild.channels.cache.find(ch => ch.name === config.botChannels[0].name);
	if (!channel) logger.warn('No welcome channel found');

	// Ignore BOTs
	if(member.bot) return;

	// Send the welcome message, mentioning the member

	// Create canvas
	const canvas = Canvas.createCanvas(1280, 640);
	const ctx = canvas.getContext('2d');
	Canvas.registerFont('./src/fonts/SVN-Gotham Regular.otf', { family: 'Gotham' });

	// Get elements
	const background = await Canvas.loadImage('./src/welcome_banner.png');

	// Change to member.user.displayAvatarURL
	const avatarURL = member.user.displayAvatarURL({ size: 512, dynamic: true }).replace('.webp', '.png');
	const avatar = await Canvas.loadImage(avatarURL);

	// Draw background
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// Welcoming message
	ctx.font = '48px "Gotham"';
	ctx.fillStyle = '#000000';
	ctx.fillText('WELCOME', 300, 450);
	ctx.font = '32px "Gotham"';
	// Idea: Scale text ctx.fillText(`${message.author.username} has joined server`, 225, 485);
	ctx.fillText('Hãy kiểm tra #claim-roles để chọn ban mảng', 80, 485);

	// Draw the avatar
	ctx.strokeStyle = '#000000';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(440, 260, 120, 0, Math.PI * 2, true);
	ctx.lineWidth = 20;
	ctx.stroke();
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(avatar, 320, 120, 260, 260);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');

	channel.send(attachment);

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
			joinedTimestamp: Date.now(),
			guildID: member.guild.id,
		});

		// console.log(user);
		user.save()
			.then(result => {
				logger.info(`Database: successfully added Guild ID ${member.guild.id} DB data, user: ${result.userID}`);
			})
			.catch(err => logger.error(err));


	});

};