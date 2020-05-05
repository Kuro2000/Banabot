const kick = require("../commands/kick")
const role = require("../commands/role")
const inv = require("../commands/inv")

module.exports = (client, message) => {
  if (message.content.startsWith("!kick")){ //Kick function
    return kick(message)
  }
  
  if (message.content.startsWith("!role")){ //Set role function
    return role(client,message)
  }

  if (message.content.startsWith("!inv")){ //Get invite link function
    return inv(message)
  }
}