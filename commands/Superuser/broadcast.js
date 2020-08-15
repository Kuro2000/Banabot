const Discord = require('discord.js')
const logger = require('../../winston');

module.exports = message =>{ //ADMIN-ONLY: Gửi tin nhắn
    message.channel.send("Ping")
    logger.info("Discord: "+message.author.id+" broadcasted a message")
} 