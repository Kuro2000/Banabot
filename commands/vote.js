const Discord = require('discord.js')

module.exports = async(message) => {
    let topic = message.content.slice(6, message.content.length);
    if (!topic){topic = "Không chủ đề"}
    message.delete()
        .catch("Voting: " + console.error)

    let voteEmbed = new Discord.MessageEmbed()
        .setColor(3447003)
        .setTitle(`**Vote: ${topic}**`)
        .setDescription("Hãy react bằng emoji tương ứng trong **15 giây** tới")
        .setFooter(`Poll được tạo bởi ${message.author.username}`)
        .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
        .addFields(
            {name: `👍: Thumps up`, value: `Đồng ý với ý kiến trên`, inline: true},
            {name: `👎: Thumps down`, value: `Không đồng ý với ý kiến trên`, inline: true}
        )
        
    const poll = await message.channel.send(voteEmbed) 
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