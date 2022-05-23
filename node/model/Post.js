const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
	},
	{ collection: 'Post' }
);

const Post = mongoose.model('post', postSchema);
module.exports = { Post };
