// User mới gia nhập server tự set role cho bản thân - Chỉ dùng trong NEC BCM

module.exports = (message) => {
    const channel = message.channel //Get channel
    const member = message.member;

    if (message.channel.id != "706914192803758181"){ //The role function is temporarily useable in NEC bot-commands channel
        channel.send("Lệnh role chưa khả dụng ở server này")
        return;
    }
    else{
        if (member._roles.length==0){
            let user_role = message.content.split(" ")[1]
            if(user_role === "btcm"){roleID = "706915179153326100"} //Role ID for BTCM role
            else if(user_role === "nccm"){roleID = "706915054284570715"} //Role ID for NCCM role
            else if(user_role === "guest"){roleID = "706915631064416257"} //Role ID for Guest role
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
        message.reply("Bạn đã chọn role thành công, hãy kiểm tra các vùng chat mới theo role của bạn 🙆🙆")
        console.log(`Successfully added roleID: ${member.roleID} to ${member.id}`)
    }
}