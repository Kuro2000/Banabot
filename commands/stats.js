const mongoose = require('mongoose')
const User = require('../models/userModels')
const Discord = require('discord.js')
const guildsIDAvailable = ["619210652455534613","650993735890501652"]

module.exports = message => {
    if (!guildsIDAvailable.includes(message.guild.id)){return message.channel.send("Lệnh chưa khả dụng ở server này 💃")} //Only available in some server
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
                lastAttendance: message.createdAt
            })
            
            user.save()
            .then(result => {
                console.log(result)
                message.reply(" Thông tin của bạn đã được khởi tạo 🙆‍♀️, hãy nhập lại lệnh **!stats** để kiểm tra")
            })
            .catch(err => console.log(err))
            
        } else{
            var uBalance = user.balance
            var uExp = user.exp
            var uLevel = user.level

            let statEmbed = new Discord.MessageEmbed()
            .setColor(3447003)
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