desc='Tạo ra một bảng vote YES/NO dựa trên số người và chủ đề đã nhập';

module.exports = message => {
    let total = Number(message.content.split(" ")[1]);
    let topic = message.content.slice(8,message.content.length);

    if(isNaN(total)){
        message.reply("Cú pháp không hợp lệ, bạn phải nhập tổng số vote và chủ đề")
    } else{
        message.reply(`Vote chủ đề _*"${topic}"*_ bằng cách react 👍 hoặc 👎 trong 15 giây tới!!`)
        message.react('👍').then(() => message.react('👎'));

        const filter = (reaction,user) => {
            return reaction.emoji.name === '👍' && user.id === message.author.id;
        }

        const collector = message.createReactionCollector(filter, { time: 15000 });
        message.react('👍')
        collector.on('collect', (reaction, user) => {
            console.log(`Voting: Collected ${reaction.emoji.name} from ${user.tag}`);
        });

        collector.on('end', collected => {
            console.log(`Voting: Collected ${collected.size} items`);
            message.reply(`Vote đã đóng! Có tổng cộng ${collected.size}/${total} vote 👍 hợp lệ`);
            (collected.size>total/2)?message.reply("Ý kiến được thông qua!!"):message.reply("Ý kiến bị bác bỏ!!");
        });
    }
}