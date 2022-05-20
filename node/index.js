const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// express에서 react폴더 안쪽에 react폴더를 static(추가가공없다는뜻)으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

// 터미널에 뜨는 문구
app.listen(port, () => {
	console.log(`Server app listening in port ${port}`);
});

// localhost:5000번에 뜨는 내용
app.get('/', (req, res) => {
	// 서버에서 5000번 포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});
