module.exports = (client, member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome')
    if(!channel) return;
    channel.send(`${member} đã rời khỏi server`)
}