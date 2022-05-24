const express = require('express');
const router = express.Router();
const multer = require('multer');

// router에 사용되는 모델을 index.js가져옴
// Post 모델 불러옴
const { Post } = require('../model/Post.js');
// Counter모델 불러옴 (미리 만들어진 스키마 규칙이 적용한 모델을 불러와도 DB에 적용됨)
const { Counter } = require('../model/Counter.js');

//  기존 index.js에 있던 라우터를 가져옴

//C : 전송버튼 클릭 시 넘오는 글 저장 요청
// post의 첫번째 인수는 '/api/post/submit' 카테고리라고 생각하면됨
// 디비상에서 확인되는건 아니고 리액트의 Post.js파일 axios안에 있는 애랑 연결되는거라서 둘만 이름이 같으면 된다. /api는 데이터통신할거다 /post는 post명해서 임의로 지정 아무거나 지정해도 상관없지만 데이터가 많아지면 구분이 힘들기 때문에 나눠준다.
router.post('/submit', (req, res) => {
	let temp = req.body;
	// 리액트에서 가져온 데이터에 Counter모델로 부터 postNum값을 찾아서 추가
	// 이때 findOne메서드로 찾을 조건을 설정
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			// 기존 클라이언트에서 받은 데이터에 카운터 모델의 postNum값을 추가 적용
			temp.postNum = doc.postNum;
			// postNum값이 추가된 게시글 데이터를 DB에 저장
			const CommunityPost = new Post(temp);

			// 인스턴스값이 save로 데이터가 저장을 성공하면 프로미스객체를 반환한다
			CommunityPost.save().then(() => {
				// 저장이 성공하면 카운터 모델을 다시 불러와서 기존 postNum값을 1씩 증가
				Counter.updateOne({ name: 'counter' }, { $inc: { postNum: 1 } }).then(
					() => {
						// 기존 Counter모델의 postNum값까지 정상적으로 증가되면 클라이언트에 응답
						res.status(200).json({ success: true });
					}
				);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ success: false });
		});
});

// R:목록페이지 접속시 db데이터 글 호출 요청
router.post('/list', (req, res) => {
	//  find는 해당목록 전부다 가져오는거
	Post.find()
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
			res.status(200).json({ success: true, filePath: res.req.file.path });
		}
	});
});

module.exports = router;
