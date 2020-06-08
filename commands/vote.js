// Tạo ra một bảng vote YES/NO dựa trên chủ đề đã nhập

module.exports = async(message) => {
    let topic = message.content.slice(6, message.content.length);
    if (!topic){topic = "Không chủ đề"}
    message.delete()
        .catch("Voting: " + console.error)
    const poll = await message.channel.send({"embed":{
        "title": `**Vote: ${topic}**`,
        "description": "Hãy react bằng emoji tương ứng trong **15 giây** tới",
        "color": 3447003,
        "footer": {
            "text": `Poll được tạo bởi ${message.author.username}`
        },
        "thumbnail": {
            "url": "https://cdn.discordapp.com/embed/avatars/0.png"
        },
          
        "fields": [
        {
            "name": "👍: Thumps up",
            "value": "Đồng ý với ý kiến trên"
        },
        {
            "name": "👎: Thumps down",
            "value": "Không đồng ý với ý kiến trên"
        }]
    }}) 
    await poll.react('👍')
    await poll.react('👎')

    const filter = (reaction,user) => {
        return reaction.emoji.name === '👍' && !user.bot;
    }

    const collector = poll.createReactionCollector(filter, { time: 15000 });

    collector.on('collect', (reaction, user) => {
        console.log(`Voting: Collected ${reaction.emoji.name} from ${user.id}`);
    });

    collector.on('end', collected => {
        console.log(`Voting: Collected ${collected.size} items`);
        message.channel.send(`***Vote đã đóng! Có tổng cộng ${collected.size} vote 👍 hợp lệ***`);
    });
}