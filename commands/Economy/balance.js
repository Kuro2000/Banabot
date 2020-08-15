const User = require('../../models/userModels');
const Discord = require('discord.js');
const ms = require('parse-ms')
const config = require('../../config.json')
const logger = require('../../winston');

module.exports = message => {
    const args = message.content.slice(9, message.content.length).split(" ");
    if(args[0]==''){args[0]='noArgs'} //Make switch(args[0]) return the default case
    switch(args[0]){
        default:
            message.channel.send("🕵️‍♀️ Hãy kiểm tra lại cú pháp bằng **``!help balance``**")
            break;

        case "god": //ADMIN ONLY: Alter money of users
            if(!message.member.hasPermission('ADMINISTRATOR')){ //check for admin permissions
                return message.reply("🚫 Chỉ admin mới có quyền thực hiện lệnh này 🚫")
            } 
            if(args.length<4||!args[1]||!args[2]||!message.mentions.members.first()||isNaN(args[1])){
                return message.reply("Bạn vẫn chưa nhập đúng lệnh 🤦‍♂️")
            }

            let targetID = message.mentions.members.first().id
            User.findOne({userID:targetID}, (err,user)=>{
                if(user==null){ return message.reply("🚫 User không tồn tại 🚫");}
                user.balance += parseInt(args[1])
                user.save()
                .then(result => {
                    let reason = ""
                    for (let i = 2; i < args.length-1; i++){
                        reason = reason + args[i] + " "
                    }
                    logger.info(`Discord: Balance changed, ID: ${result.userID}, Amount: ${args[1]}, Reason: ${reason}`)
                    changeLog = new Discord.MessageEmbed()
                        .setColor(config.embedColors.success)
                        .setFooter("💰 Economy system by Kuro")
                        .addFields(
                            { name: `**Username**`, value: message.mentions.members.first(), inline: true },
                            { name: `**Số tiền**`, value: args[1]+" vnđ", inline: true },
                            { name: `**Lí do**`, value: reason, inline: true }
                        )
                    message.channel.send(changeLog)
                })
                .catch(err => logger.error(err))
            })

            break;
        
        case "ranking": //Get leaderboards of the server      
            User.find({}, null,{sort:{balance:-1}},(err,users)=>{
                let content = ""
                i = 0
                users.forEach(user=>{
                    content+= `${i+1}. ${user.username}: ${(Math.round(user.balance * 100) / 100)} vnđ\n`
                    i+=1
                })
                let ranking = new Discord.MessageEmbed()
                    .setColor(config.embedColors.info)
                    .setTitle("**🎖️🎖️ Top các đại gia 🎖️🎖️**")
                    .setThumbnail(message.guild.iconURL)
                    .setDescription(content)
                    .setFooter("💰 Economy system by Kuro")

                message.channel.send(ranking)
            })
            break;

        case "daily": //Claim daily wages
            if(message.channel.id != "706914192803758181"){ return;} // Bot only detect specified channel to avoid spamming
            User.findOne({userID:message.author.id},(err,user)=>{
                if(user==null){ return message.reply("🚫User không tồn tại, nhập **!stats** để tạo thông tin🚫");}
                lastAttendance = Date.parse(user.lastAttendance)
                if (86400000 - (Date.now() - lastAttendance) > 0){
                    let time = ms(86400000 - (Date.now() - lastAttendance));
                    message.channel.send(`Hãy đợi **${time.hours}h ${time.minutes}m ${time.seconds}s** để nhận daily!`)
                } else{
                    user.balance+=200
                    user.lastAttendance = Date.now()

                    user.save()
                    .then(result=>{
                        logger.info(`Discord: ${result.userID} claimed daily balance`)
                        let dailyEmbed = new Discord.MessageEmbed()
                            .setColor(config.embedColors.success)
                            .setDescription(`**Lương hàng ngày**`)
                            .setThumbnail(`https://i.ytimg.com/vi/Ajxj6chgUI4/hqdefault.jpg`)
                            .addField(`Số tiền`, 200+" vnđ")
                            .setFooter("💰 Economy system by Kuro")
                
                        message.channel.send(dailyEmbed)
                    })
                    .catch(err => logger.error(err))    
                }  
            })

            break;

        case "":
            break;
    }
}