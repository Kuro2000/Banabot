const mongoose = require('mongoose')
const User = require('../models/userModels');
const Discord = require('discord.js');
const ms = require('parse-ms')

module.exports = message => {
    const args = message.content.slice(9, message.content.length).split(" ");
    if(args[0]==''){args[0]='noArgs'} //Make switch(args[0]) return the default case
    switch(args[0]){
        default:
            message.channel.send("🚫 Bạn chưa nhập đúng lệnh 🚫, các lệnh hiện có:\n`!balance god <amount> <reason> @user`: Thay đổi tiền của member (ADMIN-ONLY)\n`!balance ranking`: Hiện bảng xếp hạng\n`!balance daily`: Nhận lương hàng ngày")
            break;

        case "god": //ADMIN ONLY: Alter money of users
            if(!message.member.hasPermission('ADMINISTRATOR')){ //check for admin permissions
                return message.reply("🚫 Chỉ admin mới có quyền thực hiện lệnh này 🚫")
            } 
            if(args.length<4||!args[1]||!args[2]||!message.mentions.members.first()||isNaN(args[1])){
                return message.reply("Bạn vẫn chưa nhập đúng lệnh 🤦‍♂️")
            }

            let targetID = message.mentions.members.first().id
            let targetName = message.mentions.members.first()
            console.log(`Balance change, UID: ${targetID}`)

            User.findOne({userID:targetID}, (err,user)=>{
                if(user==null){ return message.reply("🚫 User không tồn tại 🚫");}
                user.balance += parseInt(args[1])
                user.save()
                .then(result => {
                    console.log(result)

                    changeLog = new Discord.MessageEmbed()
                        .setColor(3447003)
                        .setFooter("💰 Economy system by Kuro")
                        .addFields(
                            { name: `**Username**`, value: message.mentions.members.first(), inline: true },
                            { name: `**Số tiền**`, value: args[1]+"$", inline: true },
                            { name: `**Lí do**`, value: args[2], inline: true }
                        )
                    message.channel.send(changeLog)
                })
                .catch(err => console.log(err))
            })

            break;
        
        case "ranking": //Get leaderboards of the server      
            User.find({}, null,{sort:{balance:-1}},(err,users)=>{
                let content = ""
                i = 0
                users.forEach(user=>{
                    content+= `${i+1}. ${user.username}: ${(Math.round(user.balance * 100) / 100)}$\n`
                    i+=1
                })
                let ranking = new Discord.MessageEmbed()
                .setColor(3447003)
                .setTitle("**🎖️🎖️ Top các đại gia 🎖️🎖️**")
                .setThumbnail(message.guild.iconURL)
                .setDescription(content)
                .setFooter("💰 Economy system by Kuro")

                message.channel.send(ranking)
            })
            break;

        case "daily": //Claim daily wages
            User.findOne({userID:message.author.id},(err,user)=>{
                if(user==null){ return message.reply("🚫User không tồn tại, nhập **!stats** để tạo thông tin🚫");}
                lastAttendance = Date.parse(user.lastAttendance)
                if (86400000 - (Date.now() - lastAttendance) > 0){
                    let time = ms(86400000 - (Date.now() - lastAttendance));
                    message.channel.send(`Hãy đợi **${time.hours}h ${time.minutes}m ${time.seconds}s** để nhận daily!`)
                } else{
                    user.balance+=0.2
                    user.lastAttendance = Date.now()

                    user.save()
                    .then(result=>{
                        console.log(`${result.userID} claimed daily`)
                        let dailyEmbed = new Discord.MessageEmbed()
                            .setColor("GREEN")
                            .setDescription(`**Lương hàng ngày**`)
                            .addField(`Số tiền`, 0.2+"$")
                            .setFooter("💰 Economy system by Kuro")
                
                        message.channel.send(dailyEmbed)
                    })
                    .catch(err => console.log(err))    
                }  
            })

            break;

        case "":
            break;
    }
}