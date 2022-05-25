const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		postNum: Number, // 고유 id값
		img: String,
		// writer 항목을 추가하고 User 모델에서의 _id에 해당하는 정보의 다큐먼트 유저정보를 모두 참조
		writer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users', // 참조할 모델 스키마의 컬렉션명을 입력
		},
	},
	{ collection: 'Post' }
);

const Post = mongoose.model('post', postSchema);
module.exports = { Post };
