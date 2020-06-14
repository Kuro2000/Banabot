const mongoose = require('mongoose')
const Report = require('../models/reportModels')

module.exports = message => {
    let content = message.content.slice(7, message.content.length);
    if (!content){
        message.reply("Bạn chưa nhập nội dung muốn báo cáo 🤦‍♂️")
        return;
    }
    const report = new Report({
        _id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        username: message.author.username,
        report: content,
        time: message.createdAt
    })
    report.save()
    .then(result => {
        console.log(result)
        message.reply("Báo cáo đã được ghi nhận 📩")
    })
    .catch(err => console.log.err)

}