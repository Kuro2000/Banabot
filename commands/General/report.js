const mongoose = require('mongoose')
const Report = require('../../models/reportModels')
const logger = require('../../winston');

module.exports = message => {
    let content = message.content.slice(7, message.content.length);
    if (!content){
        message.reply("Bạn chưa nhập nội dung muốn báo cáo 🤦‍♂️")
        return;
    }
    const report = new Report({
        _id: mongoose.Types.ObjectId(),
        guildID: message.guild.id,
        userID: message.author.id,
        username: message.author.username,
        report: content,
        time: message.createdAt
    })
    report.save()
    .then(result => {
        logger.info(`Database: Report by ${message.author.id} collected: ${result}`)
        message.reply("Báo cáo đã được ghi nhận 📩")
    })
    .catch(err => logger.error(err))

}