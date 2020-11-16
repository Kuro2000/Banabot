const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	userID:{ type: String, unique:true, required:true },
	username:{ type: String, unique:true, required:true },
	badges:{ type: Array },
	guildList: { type: [{
		guildID: { type: String, required:true },
		joinedTimestamp:{ type: Date, unique:true },
		roleList:{ type: Array },
		balance: { type: Number, default: 0 },
		exp: { type: Number, default: 0 },
		stars: { type: Number, default: 0 },
	}], require:true, default: [] },
});

module.exports = mongoose.model('Users', userSchema);