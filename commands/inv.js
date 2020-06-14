module.exports = message => {
    message.channel.createInvite({
        maxAge: 86400,
        unique: true
    })
    .then(invite => {
        console.log(`Invite code created for GuildID ${message.guild.id}: ${invite.code}`)
        message.reply(`🧾 Link invite: https://discord.gg/${invite.code}`)
    })
}
