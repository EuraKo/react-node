const express = require('express');
const router = express.Router();
const { User } = require('../model/User.js');
const { Counter } = require('../model/Counter.js');

router.post('/join', (req, res) => {
	// 클라이언트에서 Join.js컴포넌트로 부터 firebase로 생서된 유저정보를 바디파서로 전달받음
	// 전달받은 객체  Counter모델로부터 불러온 userNum값을 추가하고 User모델 저장
	const temp = req.body;
	Counter.findOne({ name: 'counter' }).then((doc) => {
		// console.log(doc); // db에 저장된 counter 값을 받아옴
		// Counter모델에서 미리 만들어둔 userNum값을 가져와서
		// 기존 temp객체에 추가
		temp.userNum = doc.userNum;

		// 추가된 데이터를 모델스키마를 통해서 유저정보 모델을 만들고 db에저장
		const userData = new User(temp);
		userData
			.save()
			.then(() => {
				// 유저모델이 db에 저장, 완료후 다시 Counter모델에서 userNum값을 1증가
				Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } }).then(
					() => {
						// 증가가 완료되면 성공 응답 클라이언트에 넘겨줌
						res.status(200).json({ success: true });
					}
				);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json({ success: false });
			});
	});
});
//닉네임 중복체크 요청
router.post('/namecheck', (req, res) => {
	User.findOne({ displayName: req.body.displayName })
		.exec()
		.then((doc) => {
			let check = true;
			if (doc) check = false;

			res.status(200).json({ success: true, check });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ success: false });
		});
});

module.exports = router;
