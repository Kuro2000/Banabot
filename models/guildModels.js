const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema({
	_id: Schema.Types.ObjectId,
	guildID:{ type: String, unique: true, require: true },
	guildName:{ type: String },
	ownerID:{ type: String, unique: false, require: true },
	prefix:{ type: String, require: true, default: '!' },
	createdTimestamp:{ type: Date },
	region:{ type: String },

});

module.exports = mongoose.model('Guilds', guildSchema);
