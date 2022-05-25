import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase';
import axios from 'axios';

function Join() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pw1, setPw1] = useState('');
	const [pw2, setPw2] = useState('');
	const [name, setName] = useState('');

	const handleJoin = async () => {
		if (!(name && email && pw1 && pw2)) {
			return alert('모든 항목을 입력해주세요');
		}
		if (pw1 !== pw2) {
			return alert('비밀번호를 동일하게 입력하세요');
		}
		// firebase에서 비번이 최소 6글자이상작성
		if (pw1.length < 6) {
			return alert('비밀번호는 최소 6글자 이상 입력하세요');
		}

		// 위 조건을 통과해서 회원가입을 하기 위한 정보값을 변수에 할당
		// 이때 await문으로 firebase를 통해서 인증완료 이후에 다음 코드가 동작되도록 처리
		let createdUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, pw1);

		await createdUser.user.updateProfile({
			displayName: name,
		});

		console.log(createdUser); // user.multiFactor.user에 정보나옴

		// 저장된 회원 정보값을 axios로 전달하기 위해서 객체로 저장
		const body = {
			email: createdUser.user.multiFactor.user.email,
			displayName: createdUser.user.multiFactor.user.displayName,
			uid: createdUser.user.multiFactor.user.uid,
		};

		axios.post('/api/user/join', body).then((res) => {
			if (res.data.success) {
				//회원가입성공
				navigate('/login');
			} else {
				// 회원가입 실패
				return alert('회원가입에 실패했습니다.');
			}
		});
	};

	return (
		<section id='join'>
			<div className='inner'>
				<article>
					<h2>join member</h2>
					<input
						type='email'
						value={email}
						placeholder='이메일을 입력하세요'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br />
					<input
						type='password'
						value={pw1}
						placeholder='비밀번호를 입력하세요'
						onChange={(e) => setPw1(e.target.value)}
					/>
					<br />
					<input
						type='password'
						value={pw2}
						placeholder='비밀번호를 재 입력하세요'
						onChange={(e) => setPw2(e.target.value)}
					/>
					<br />
					<input
						type='text'
						value={name}
						placeholder='닉네임을 입력하세요'
						onChange={(e) => setName(e.target.value)}
					/>
					<br />
					<button onClick={handleJoin}>회원가입</button>
				</article>
			</div>
		</section>
	);
}

export default Join;
