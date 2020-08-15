const mongoose = require('mongoose')
const Schema = mongoose.Schema

var reportSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildID:{type: String, require: true},
    userID:{type: String, require: true},
    username: String,
    role: String,
    report:{type: String, require: true},
    time:{type: Date}
})

module.exports = mongoose.model('Reports', reportSchema)