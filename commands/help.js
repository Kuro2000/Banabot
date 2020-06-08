// Hiển thị danh sách lệnh

const fs = require('fs')
const config = require('../config.json')

module.exports = (message) => {
    const channel = message.channel //Get channel
    fs.readdir("./commands",(err,files)=>{
        files.forEach(file=>{
            const eventName = file.split(".")[0]; //Get name of each commands through fs.readdir function
            eventName[0].toUpperCase();

            fs.readFile(`./commands/${file}`,'utf-8',(err,data)=>{
                //const eventDesc = ((data.split('\n')[0]).match(/'([^']+)'/)[1]); //Get the description as the first line of commands file
                const eventDesc = (data.split('\n')[0]).slice(3);
                channel.send(`> ${config.prefix}${eventName}: ${eventDesc}`);
            });
            
        })
    }) 
}