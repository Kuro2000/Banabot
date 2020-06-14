const Discord = require('discord.js')
const config = require('../config.json')
const prefix = config.prefix

module.exports = (message) => {
    let helpEmbed = new Discord.MessageEmbed()
    .setColor(3447003)
    .setTitle(`Commands list`)
    .setDescription(`**📜Các câu hiện có trong server**`)
    .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
    .addFields(
        {name: `🙋‍♂️ **${prefix}help**`, value: "Danh sách các lệnh"},
        {name: `⚰️ **${prefix}role <role>**`, value: "Set role cho thành viên, hiện có: `btcm`,`nccm` và `guest`"},
        {name: `📊 **${prefix}stats**`, value: "Khởi tạo và hiển thị các thông tin người dùng"},
        {name: `💰 **${prefix}balance <câu lệnh>**`, value: "Các lệnh về server economy, câu lệnh hiện có: `ranking` và `daily`"},
        {name: `🗳️ **${prefix}vote <chủ đề>**`, value: "Tạo nhanh bộ vote YES/NO"},
        {name: `💌 **${prefix}inv**`, value: "Tạo mã mời vào server", inline: true},
        {name: `🦶 **${prefix}kick @user**`, value: "Kick một người khỏi server", inline: true},
        {name: `📝 **${prefix}report <nội dung>**`, value: "Gửi báo cáo, góp ý server"},
        {name: "😎 **Các lệnh admin khác**", value: `Hiện có lệnh *${prefix}send*, *${prefix}balance god*`},
    )
    .setFooter("Discord BOT by Kuro")

    message.channel.send(helpEmbed)
}