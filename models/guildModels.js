const mongoose = require('mongoose')
const Schema = mongoose.Schema

var guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildID:{type: String, unique: true, require: true},
    ownerID:{type: String, unique: true, require: true}
})

module.exports = mongoose.model('Guilds', guildSchema)