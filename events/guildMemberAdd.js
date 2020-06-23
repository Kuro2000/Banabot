const mongoose = require('mongoose')
const User = require('../models/userModels')

module.exports = (client, member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    // Send the message, mentioning the member
    if(client.guilds.id == '650993735890501652'){ //Custom DM only used in the guild with id inputted
        channel.send(`Chào mừng bạn đến server, ${member}, một chú BOT 🤖 đã PM cho bạn cách thức để gia nhập server, hãy làm theo hướng dẫn`);
        member.send("Hãy chọn Role của bạn bằng cách **Nhập lệnh sau** vào kênh text *bot-commands*:\nNhập ```!role btcm```nếu bạn thuộc tiểu ban **Biên tập Chuyên môn** ⚰️⚰️\n```!role nccm```nếu bạn thuộc tiểu ban **Nghiên cứu và Ứng dụng Chuyên môn** ⚰️⚰️\n```!role guest```nếu bạn là Khách 🐵🐵\nBạn nên check Pinned messages của box chat *bot-commands* để biết thêm về một số lệnh khác")    
    }

    //Save info to DB
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        userID: member.id,
        username: member.username,
        role: "default",
        balance: 0,
        level: 1,
        exp: 0,
        lastAttendance: 0
    })
    
    user.save()
    .then(result => {
        console.log("Sucessfully init DB data, user: "+result.userID)
    })
    .catch(err => console.log(err))
   
}