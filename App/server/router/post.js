const express = require('express');
const router = express.Router();
const multer = require('multer');

// router에 사용되는 모델을 index.js가져옴
// Post 모델 불러옴
const { Post } = require('../model/Post.js');
// Counter모델 불러옴 (미리 만들어진 스키마 규칙이 적용한 모델을 불러와도 DB에 적용됨)
const { Counter } = require('../model/Counter.js');
const { User } = require('../model/User.js');

//  기존 index.js에 있던 라우터를 가져옴

//C : 전송버튼 클릭 시 넘오는 글 저장 요청
// post의 첫번째 인수는 '/api/post/submit' 카테고리라고 생각하면됨
// 디비상에서 확인되는건 아니고 리액트의 Post.js파일 axios안에 있는 애랑 연결되는거라서 둘만 이름이 같으면 된다. /api는 데이터통신할거다 /post는 post명해서 임의로 지정 아무거나 지정해도 상관없지만 데이터가 많아지면 구분이 힘들기 때문에 나눠준다.
router.post('/submit', (req, res) => {
	let temp = req.body;
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((counter) => {
			temp.postNum = counter.postNum;

			//body로 전달된 값에 postNum까지 추가된 값에 다시 writer정보값 추가
			User.findOne({ uid: req.body.uid })
				.exec()
				.then((userInfo) => {
					//temp객체에 writer키값을 추가하고 user다큐먼트 정보에서 _id값에 해당 하는 모든 정보를 넣어줌
					temp.writer = userInfo._id;

					//기존 CommunityPost 저장하는 구문을 이곳의 then구문 안쪽에 가져와서
					//temp에 writer키값이 추가된 값을 최종 저장
					const CommunityPost = new Post(temp);
					CommunityPost.save()
						.then(() => {
							Counter.updateOne(
								{ name: 'counter' },
								{ $inc: { postNum: 1 } }
							).then(() => {
								res.status(200).json({ success: true });
							});
						})
						.catch((err) => {
							console.log(err);
							res.status(400).json({ success: false });
						});
				});
		});
});

// R:목록페이지 접속시 db데이터 글 호출 요청
router.post('/list', (req, res) => {
	const sort = {};
	if (req.body.sort === 'new') {
		sort.createdAt = -1; // 역순
	}
	if (req.body.sort === 'old') {
		sort.createdAt = 1;
	}
	//  find는 해당목록 전부다 가져오는거
	Post.find({
		$or: [
			{ title: { $regex: req.body.search } },
			{ content: { $regex: req.body.search } },
		],
	})
		.populate('writer') // 데이터중에 ObjectId를 참조하는 데이터가 있으면 해당 참조 모델 데이터 까지 하위 객체로 합쳐서 가져옴
		.sort(sort)
		.limit(req.body.count) // 화면에 출력될개수 0은 전부다
		.exec()
		.then((doc) => {
			// 성공하면 postList라는 객체를 만들어서 넘겨라
			res.status(200).json({ success: true, postList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ success: false });
		});
});

// 상세글 호출
router.post('/detail', (req, res) => {
	// body-parser넘어올때 기본적으로 문자로 넘어오기떄문에 숫자로 변환해서 넘겨줘야함
	Post.findOne({ postNum: Number(req.body.postNum) })
		.populate('writer')
		.exec()
		.then((doc) => {
			// 터미널에서 찍힌다.
			console.log(doc);
			// 찾아진 결과값을 post에 담아 프론트에 응답
			res.status(200).json({ success: true, post: doc });
		})
		.catch((err) => {
			console.log(err);
		});
});

// U : 글내용 수정요청
router.post('/edit', (req, res) => {
	const temp = {
		title: req.body.title,
		content: req.body.content,
		img: req.body.img,
	};
	Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
		.exec()
		.then(() => {
			res.status(200).json({ success: true });
		})
		.catch((err) => {
			res.status(400).json({ success: false });
		});
});

// D : 글 삭제
router.post('/delete', (req, res) => {
	Post.deleteOne({ postNum: Number(req.body.postNum) })
		.exec()
		.then(() => {
			res.status(200).json({ success: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ success: false });
		});
});

// multer호출 구문 입력
// formData로 불러와진 저장 위치 지정 및 파일명 변경
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// 이미지 파일이 저장될 폴더경로 저장
		cb(null, 'img/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage }).single('file');

// 이미지 업로드 요청
router.post('/imgUpload', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.log(err);
			res.status(400).json({ success: false });
		} else {
			// 이미지 첨부하면 받아지는 이미지 정보값 확인
			console.log(res.req.file);
			// 이미지 파일 정보값중에서 경로값을 다시 다시 클라이언트로 전달
			console.log(res.req.file.path);
			res.status(200).json({ success: true, filePath: res.req.file.path });
		}
	});
});

module.exports = router;
