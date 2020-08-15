const Discord = require('discord.js')
const config = require('../../config.json')
const logger = require('../../winston');

module.exports = async(message) => {
    let topic = message.content.slice(6, message.content.length);
    if (!topic){topic = "No topic"}
    message.delete()
        .catch("Voting: " + console.error)

    let voteEmbed = new Discord.MessageEmbed()
        .setColor(config.embedColors.info)
        .setTitle(`**Vote: ${topic}**`)
        .setDescription("Hãy react bằng emoji tương ứng trong **15 giây** tới")
        .setFooter(`Poll được tạo bởi ${message.author.username}`)
        .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
        .addFields(
            {name: `👍: Thumps up`, value: `Đồng ý với ý kiến trên`, inline: true},
            {name: `👎: Thumps down`, value: `Không đồng ý với ý kiến trên`, inline: true}
        )
    
    logger.info(`Discord: Vote poll ${topic} created by ${message.author.id}`)
    const poll = await message.channel.send(voteEmbed) 
    await poll.react('👍')
    await poll.react('👎')

    const filter = (reaction,user) => {
        return reaction.emoji.name === '👍' && !user.bot;
    }

    const collector = poll.createReactionCollector(filter, { time: 15000 });

    collector.on('collect', (reaction, user) => {
        logger.info(`Discord: Voting: Collected ${reaction.emoji.name} from ${user.id}`);
    });

    collector.on('end', collected => {
        logger.info(`Discord: Voting: Poll collected ${collected.size} items`);
        message.channel.send(`***Vote đã đóng! Có tổng cộng ${collected.size} vote 👍 hợp lệ***`);
    });
}