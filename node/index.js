const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/key.js'); // 배포와 개발을 나눠 몽고디비 정보 숨기기
const app = express();
const port = 5000;

// express에서 react폴더 안쪽에 react폴더를 static(추가가공없다는뜻)으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));
app.use('/img', express.static('./img'));
// client로 부터 전달받을 내용을 불러오기 위한 body-parser설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// post 전용 라우터 추가
app.use('/api/post', require('./router/post.js'));
app.use('/api/user', require('./reouter/user.js'));

// 터미널에 뜨는 문구
app.listen(port, () => {
	// connect는 promise객체를 반환한다.
	// 안에 몽고디비의 주소를 써주고 아이디:비번도써준다
	mongoose
		.connect(config)
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
