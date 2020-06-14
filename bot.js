require("dotenv").config()
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const mongoose = require('mongoose');
const db = mongoose.connection;

fs.readdir("./events",(err,files)=>{
    files.forEach(file=>{
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0]
        client.on(eventName,(...args)=> eventHandler(client,...args))
    })
})

client.login(process.env.BOT_TOKEN)

//Database connection establish
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('DB Connected!'));
db.on('error', err=>{
    console.log(`DB connection error: ${err.message}`)
})
