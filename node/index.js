const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// mongodb+srv://eura:euranode@cluster0.z0yde.mongodb.net/?retryWrites=true&w=majority

// express에서 react폴더 안쪽에 react폴더를 static(추가가공없다는뜻)으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

// 터미널에 뜨는 문구
app.listen(port, () => {
	// connect는 promise객체를 반환한다.
	// 안에 몽고디비의 주소를 써주고 아이디:비번도써준다
	mongoose
		.connect(
			'mongodb+srv://eura:euranode@cluster0.z0yde.mongodb.net/?retryWrites=true&w=majority'
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
