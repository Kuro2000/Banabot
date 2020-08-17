const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	userID:{ type: String, unique:true, required:true },
	username: String,
	balance:{ type: Number, require:true },
	role: { type:String, enum: ['default', 'admin'] },
	level:{ type: Number, require:true },
	exp:{ type: Number, require:true },
	lastAttendance: Date,
});

module.exports = mongoose.model('Users', userSchema);