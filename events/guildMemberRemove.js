const mongoose = require('mongoose')
const User = require('../models/userModels')

module.exports = (client, member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome')
    if(!channel) return;
    channel.send(`${member} đã rời khỏi server`)
    User.remove({userID: member.id}, err =>{
        if(!err){return console.log(`Successfully deleted DB data, user: ${member.id}`)}
        console.log("Error: " +err)
    })
}