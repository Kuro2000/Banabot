const mongoose = require('mongoose')
const User = require('../../models/userModels')
const Discord = require('discord.js')
const config = require('../../config.json')
const logger = require('../../winston');

module.exports = message => {
    User.findOne({userID:message.author.id}, (err,user)=>{
        if(user == null){ //Create new db collections if none was found
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                username: message.author.username,
                role: "default",
                balance: 0,
                level: 1,
                exp: 0,
                lastAttendance: 0
            })
            
            user.save()
            .then(result => {
                logger.info(`Database: User ${message.author.id} data initiated: ${result}`)
                message.reply(" Thông tin của bạn đã được khởi tạo 🙆‍♀️, hãy nhập lại lệnh **!stats** để kiểm tra")
            })
            .catch(err => logger.error(err))
            
        } else{
            var uBalance = user.balance
            var uExp = user.exp
            var uLevel = user.level

            let statEmbed = new Discord.MessageEmbed()
                .setColor(config.embedColors.info)
                .setTitle(`Thông tin cá nhân`)
                .setFooter("Economy system by Kuro")
                .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
                .addFields(
                    {name: `🙋‍♂️ **Username**:`, value: message.author.username},
                    {name: `💰 **Tài sản**`, value: (Math.round(uBalance * 100) / 100) +"$"},
                    {name: `📝 **Cấp độ**`, value: `${uLevel}: Newbie`, inline: true},
                    {name: `👑 **EXP**`, value: `Exp: ${uExp}/1 tỉ`, inline: true}
                )

            message.channel.send(statEmbed)
        }   
    })    
}