const kick = require("../commands/kick")
const role = require("../commands/role")
const inv = require("../commands/inv")
const vote = require("../commands/vote")
const help = require("../commands/help")

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

  if(message.content.startsWith("!vote")){ //Vote function
    return vote(message)
  }

  if(message.content.startsWith("!help")){ //Get list of function
    return help(client,message)
  }

}