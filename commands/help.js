desc='Hiển thị danh sách lệnh';

const fs = require('fs');

module.exports = (client,message) => {
    const channel = client.channels.cache.get("707132999199752192") //bot-commands channel

    fs.readdir("./commands",(err,files)=>{
        files.forEach(file=>{
            const eventName = file.split(".")[0]; //Get name of each commands through fs.readdir function
            eventName[0].toUpperCase();

            fs.readFile(`./commands/${file}`,'utf-8',(err,data)=>{
                const eventDesc = ((data.split('\n')[0]).match(/'([^']+)'/)[1]); //Get the description as the first line of commands file
                channel.send(`! ${eventName}: ${eventDesc}`);
            });
            
        })
    }) 
    
}