const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

require('dotenv').config();

const fs = require('fs');
const requireDir = require('require-dir');
const dir = requireDir('./commands', { recurse: true, extensions: ['.js'] });

const mongoose = require('mongoose');
const db = mongoose.connection;

const logger = require('./winston');

// Establish Discord Client connection

// Events handlers
fs.readdir('./events', (err, files)=>{
	files.forEach(file=>{
		const eventHandler = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, (...args)=> eventHandler(client, ...args));
	});
});

// Commands handlers
Object.keys(dir).forEach(category =>{
	Object.keys(dir[category]).forEach(commandName =>{
		const command = require(`./commands/${category}/${commandName}.js`);
		client.commands.set(commandName, command);
	});
});

client.login(process.env.BOT_TOKEN);

// Establish Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => logger.info('Database: Connected!'));
db.on('error', err=>{
	logger.error(`Database: connection error: ${err.message}`);
});