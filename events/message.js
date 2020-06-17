const kick = require("../commands/kick")
const role = require("../commands/exclusive/role")
const news = require("../commands/exclusive/news")
const inv = require("../commands/inv")
const vote = require("../commands/vote")
const help = require("../commands/help")
const report = require("../commands/report")
const stats = require("../commands/stats")
const send = require("../commands/send")
const balance = require("../commands/balance")
const config = require("../config.json")

// Embed visualizer link: https://leovoel.github.io/embed-visualizer/

const prefix = config.prefix
module.exports = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return; //Return none if prefix not detected or if author is also a bot

  if(message.author.id == config.ownerID){ //Test functions for server owner
    if (message.content.startsWith(prefix + "send")){ //Make custom announcements.
      return send(message)
    }
  }

  if (message.content.startsWith(prefix + "role")){ //Set role function, only useable in specified GuildID.
    return role(message)
  }

  if (message.content.startsWith(prefix + "news")){ //Set role function, only useable in specified GuildID.
    return news(message)
  }

  if (message.content.startsWith(prefix+"report")){ //Report issues function.
    return report(message)
  }

  if (message.content.startsWith(prefix+"stats")){ //Check stat
    return stats(message)
  }

  if (message.content.startsWith(prefix + "kick")){ //Kick function.
    return kick(message)
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

  if(message.content.startsWith(prefix + "balance")){ //Economy commands
    return balance(message)
  }
}