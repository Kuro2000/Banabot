const config = require("../config.json")
var requireDir = require('require-dir');
var dir = requireDir('../commands', {recurse: true, extensions: ['.js']});
const logger = require('../winston');

// Embed visualizer link: https://leovoel.github.io/embed-visualizer/

const prefix = config.prefix
module.exports = (client, message) => {
  if (message.content ==="test"){message.reply("Tested")}

  if (!message.content.startsWith(prefix) || message.author.bot) return; //Return none if prefix not detected or if author is also a bot

  //Superuser commands
  if (message.author.id == config.ownerID){ //Functions for server owner
    if (message.content.startsWith(prefix + "broadcast")){ //Make custom announcements.
      logger.info("Discord: "+ message.author.id +" initiated broadcast command")
      return dir.Superuser.broadcast(message)
    }
  }

  //Economy commands
  if (message.guild.id != config.NECGuildID){
    message.channel.send("Lệnh chỉ khả dụng tại Discord **Ban Chuyên môn NEC**")
  } else{
    if (message.content.startsWith(prefix+"stats")){ //Check user's stats
      return dir.Economy.stats(message)
    }

    if (message.content.startsWith(prefix + "balance")){ //Economy commands
      return dir.Economy.balance(message)
    }
  }

  //General commands
  if(message.content.startsWith(prefix + "help")){ //Get list of function.
    return dir.General.help(message)
  }

  if (message.content.startsWith(prefix + "inv")){ //Get invite link function.
    return dir.General.inv(message)
  }

  if (message.content.startsWith(prefix+"report")){ //Report issues function.
    return dir.General.report(message)
  }

  if(message.content.startsWith(prefix + "someone")){ // Mention an user randomly
    return dir.General.someone(message)
  }

  if(message.content.startsWith(prefix + "vote")){ //Vote function.
    return dir.General.vote(message)
  }
  
  //Moderation commands
  if (message.content.startsWith(prefix + "kick")){ //Kick function.
    return dir.Moderation.kick(message)
  }

  //NEC-only commands
  if (message.guild.id != config.NECGuildID){
    message.channel.send("Lệnh chỉ khả dụng tại Discord **Ban Chuyên môn NEC**")
  } else{
    if (message.content.startsWith(prefix + "role")){ //Set role function, only useable in specified GuildID.
      return dir.NEC.role(message)
    }
  
    if (message.content.startsWith(prefix + "news")){ //Check news
      return dir.NEC.news(message)
    }
  }
}