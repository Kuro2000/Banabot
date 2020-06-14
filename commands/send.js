const Discord = require('discord.js')

module.exports = message =>{ //ADMIN-ONLY: Gửi tin nhắn
    message.channel.send("Ping")
} 