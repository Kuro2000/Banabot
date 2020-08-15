require("dotenv").config()
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const mongoose = require('mongoose');
const db = mongoose.connection;
const logger = require('./winston')

//Establish Discord Client connection
fs.readdir("./events",(err,files)=>{
    files.forEach(file=>{
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0]
        client.on(eventName,(...args)=> eventHandler(client,...args))
    })
})

client.login(process.env.BOT_TOKEN)

//Establish Database connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => logger.info('Database: Connected!'));
db.on('error', err=>{
    logger.error(`Database: connection error: ${err.message}`)
})
