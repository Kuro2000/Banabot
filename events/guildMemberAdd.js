module.exports = (client, member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Chào mừng bạn đến server, ${member}, một chú BOT đã PM cho bạn cách thức để gia nhập server, hãy làm theo hướng dẫn`);

    member.send(
      "Hãy chọn Role của bạn bằng cách nhập lệnh sau vào kênh text bot-commands:"
    )

    member.send(
        "Nhập '!role btcm' nếu bạn thuộc tiểu ban Biên tập Chuyên môn"
    )

    member.send(
        "Nhập '!role nccm' nếu bạn thuộc tiểu ban Nghiên cứu và Ứng dụng Chuyên môn"
    )

    member.send(
        "Nhập '!role guest' nếu bạn là Khách"
    )
}