const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		postNum: Number, // 고유 id값
		img: String,
		// writer 항목을 추가하고 User 모델에서의 _id에 해당하는 정보의 다큐먼트 유저정보를 모두 참조
		wirter: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ collection: 'Post' }
);

const Post = mongoose.model('post', postSchema);
module.exports = { Post };
