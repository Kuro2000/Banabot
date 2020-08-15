const logger = require('../../winston');

module.exports = message => {
    const member = message.mentions.members.first()
    if (!member) {
      return message.reply(`Mention người bạn muốn kick 🦶🏿`)
    }
    if (!member.kickable) {
      return message.reply(`🚫 User này không thể bị kick 🚫`)
    }
    return member
      .kick()
      .then(() => {
        message.reply(`${member.user.tag} đã bị kick. ⚰️⚰️`)
        logger.info(`Discord: ${message.author.id} kicked ${member.user.id}`)
      })
      .catch(error => {
        message.reply(`Có lỗi xảy ra`)
        logger.error(error)
      })
}