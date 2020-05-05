require("dotenv").config()
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

fs.readdir("./events",(err,files)=>{
    files.forEach(file=>{
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0]
        client.on(eventName,(...args)=> eventHandler(client,...args))
    })
})

// client.on("ready",()=>{
//     console.log("Logged in as " + client.user.tag)
// })

// client.on("!message", msg =>{
//     if(msg.content === "ping"){
//         msg.reply("Pong!")
//     }
// })

// client.on("guildMemberAdd", member.send("Welcome to the server"))

client.login(process.env.BOT_TOKEN)