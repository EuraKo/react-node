const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		postNum: Number, // 고유 id값
	},
	{ collection: 'Post' }
);

const Post = mongoose.model('post', postSchema);
module.exports = { Post };
