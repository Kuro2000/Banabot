const kick = require("../commands/kick")
const role = require("../commands/role")
const inv = require("../commands/inv")
const vote = require("../commands/vote")
const help = require("../commands/help")
const config = require("../config.json")

const prefix = config.prefix
module.exports = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return; //Return none if prefix not detected or if author is also a bot

  if (message.content.startsWith(prefix + "ping") && message.author.id == config.ownerID){ //Test function for server owner
    return message.channel.send({embed:{
      color: 3447003,
      description: "A very simple Embed!"
    }})
  }

  if (message.content.startsWith(prefix + "kick")){ //Kick function.
    return kick(message)
  }
  
  if (message.content.startsWith(prefix + "role")){ //Set role function, only useable in my server.
    return role(message)
  }

  if (message.content.startsWith(prefix + "inv")){ //Get invite link function.
    return inv(message)
  }

  if(message.content.startsWith(prefix + "vote")){ //Vote function.
    return vote(message)
  }

  if(message.content.startsWith(prefix + "help")){ //Get list of function.
    return help(message)
  }

}