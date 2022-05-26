const mongoose = require('mongoose');
const counterSchema = new mongoose.Schema(
	{
		name: String,
		postNum: Number,
		userNum: Number, // 로그인 용
	},
	{ collection: 'Counter' }
);

const Counter = mongoose.model('Counter', counterSchema);

module.exports = { Counter };
