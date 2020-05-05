module.exports = (client,message) => {
    const member = message.member;
    const channel = client.channels.cache.get("706914192803758181") //bot-commands channel

    if (member._roles.length==0){
        if(message.content.split(" ")[1]==="btcm"){roleID = "706915179153326100"} //Role ID for BTCM role
        else if(message.content.split(" ")[1]==="nccm"){roleID = "706915054284570715"} //Role ID for NCCM role
        else if(message.content.split(" ")[1]==="guest"){roleID = "706915631064416257"} //Role ID for Guest role
        else{
            channel.send("Bạn nhập sai cú pháp!!")
            return; 
        }
    }
    else{
        channel.send("Bạn đã chọn role trước đó rồi")
        return;
    }
    
    roleAtts = message.guild.roles.cache.get(roleID);
    member.roles.add(roleAtts);
    message.reply("Bạn đã chọn role thành công, hãy kiểm tra các vùng chat mới theo role của bạn 🙆🙆");
    
}