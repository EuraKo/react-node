const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Post 모델 불러옴
const { Post } = require('./model/Post.js');

// mongodb+srv://eura:euranode@cluster0.z0yde.mongodb.net/?retryWrites=true&w=majority

// express에서 react폴더 안쪽에 react폴더를 static(추가가공없다는뜻)으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));
// client로 부터 전달받을 내용을 불러오기 위한 body-parser설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 터미널에 뜨는 문구
app.listen(port, () => {
	// connect는 promise객체를 반환한다.
	// 안에 몽고디비의 주소를 써주고 아이디:비번도써준다
	mongoose
		.connect(
			'mongodb+srv://eura:euranode@cluster0.z0yde.mongodb.net/Community?retryWrites=true&w=majority'
		)
		.then(() => {
			console.log(`Server app listening in port ${port}`);
			console.log('connecting mongoDB...');
		})
		.catch((err) => {
			console.log(err);
		});
});

// localhost:5000번에 뜨는 내용
app.get('/', (req, res) => {
	// 서버에서 5000번 포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});

// 어떤 경로에서 접속하든 index.html이 뜨도록한다. 이걸 안하면 루트페이지가 아닌 페이지에서 새로고침하면 에러가 뜸
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});

/* //클라이언트로 부터 넘어온 요청처리 라우터
app.post('/api/test', (req, res) => {
	console.log(req.body);

	// 불러온 모델 스키마를 통해서 데이터를 인수로 넣어 모델 인스턴스 생성
	const CommunityPost = new Post({
		title: 'test',
		content: 'test description',
	});

	// 생성된 모델 인스턴스를 저장해야지 실제 db에 저장됨
	CommunityPost.save().then(() => {
		// 이후 db에 데이터가 잘 저장되면 응답처리
		res.status(200).json({ success: true, text: 'data saved' });
	});
}); */

//C : 전송버튼 클릭 시 넘오는 글 저장 요청
// post의 첫번째 인수는 '/api/post/submit' 카테고리라고 생각하면됨
// 디비상에서 확인되는건 아니고 리액트의 Post.js파일 axios안에 있는 애랑 연결되는거라서 둘만 이름이 같으면 된다. /api는 데이터통신할거다 /post는 post명해서 임의로 지정 아무거나 지정해도 상관없지만 데이터가 많아지면 구분이 힘들기 때문에 나눠준다.
app.post('/api/post/submit', (req, res) => {
	const CommunityPost = new Post(req.body);

	// 인스턴스값이 save로 데이터가 저장을 성공하면 프로미스객체를 반환한다
	CommunityPost.save()
		.then(() => {
			res.status(200).json({ success: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ success: false });
		});
});

// R:목록페이지 접속시 db데이터 글 호출 요청
app.post('/api/post/list', (req, res) => {
	//  find는 해당목록 전부다 가져오는거
	Post.find()
		.exec()
		.then((doc) => {
			// 성고하면 postList라는 객체를 만들어서 넘겨라
			res.status(200).json({ success: true, postList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ success: false });
		});
});
