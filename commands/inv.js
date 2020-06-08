// Lấy link invite của Server

module.exports = message => {
    const channel = message.channel //Get channel
    channel.createInvite({
        maxAge: 86400,
        unique: true
    })
        .then(invite => {
            console.log(`Invite code created: ${invite.code}`)
            message.reply(`🧾 Link invite: https://discord.gg/${invite.code}`)
        })
    
}
