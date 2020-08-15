const Discord = require('discord.js');
ignoredRoleIDlist = [651048551631028224, 706914571356733460]

module.exports = message => {

    message.channel.send("Tính năng đang hoàn thiện")
    let list = []
    message.guild.members.cache.forEach(member => {
        if(!member.user.bot){ //Check and remove BOT accounts
            console.log(member.user.username + " roles: " + member._roles)
            member._roles.forEach(role =>{
                if (!ignoredRoleIDlist.includes(role) && !list.includes(member)) {
                    list.push(member)
                }
            })

            list.forEach(member =>{
                console.log(member.username)
            })
            // member.user._roles.forEach(role =>{
            //     console.log(role)
            // })
            // console.log(member.user.id)
            // console.log(member.user.username)
        }
    })
    //console.log(message.guild.members.cache)


    
// Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
// list.members.forEach(member => console.log(member.user.username)); 

}