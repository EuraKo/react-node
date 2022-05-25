const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
	{
		userNum: Number,
		email: String,
		displayName: String,
		uid: String,
	},
	{ collection: 'Users' }
);
const User = mongoose.model('user', userSchema);
module.exports = { User };
