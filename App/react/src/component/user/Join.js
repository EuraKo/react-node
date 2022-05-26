import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from '../../firebase';
import axios from 'axios';

function Join() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pw1, setPw1] = useState('');
	const [pw2, setPw2] = useState('');
	const [name, setName] = useState('');
	// 닉네임 검사 결과를 담을 state
	const [nameCheck, setNameCheck] = useState(false);
	// 닉네임 관련 출력문이 담길 state
	const [nameInfo, setNameInfo] = useState('');

	const handleNameCheck = () => {
		if (!name) {
			return alert('닉네임을 입력하세요');
		}
		const body = {
			displayName: name,
		};

		axios.post('/api/user/nameCheck', body).then((res) => {
			if (res.data.success) {
				// 해당 사용자의 DB상에 없을때
				if (res.data.check) {
					setNameCheck(true);
					setNameInfo('사용가능한 닉네임입니다.');
				} else {
					setNameInfo('중복된 닉네임입니다.');
				}
			}
		});
	};
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
		// nameCheck값이 true여야지만 인증통과
		if (!nameCheck) {
			return alert('닉네임 중복검사를 진행해주세요.');
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
					<Link to='/' className='logo'>
						<img src={`${process.env.PUBLIC_URL}/img/logo_w.svg`} alt='logo' />
					</Link>
					<label htmlFor='email'>E-mail</label>
					<input
						type='email'
						id='email'
						value={email}
						placeholder='이메일을 입력하세요.'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br />
					<label htmlFor='pw1'>Password</label>
					<input
						type='password'
						id='pw1'
						value={pw1}
						placeholder='비밀번호를 입력하세요'
						onChange={(e) => setPw1(e.target.value)}
					/>
					<br />
					<label htmlFor='pw2'>Re Password</label>
					<input
						type='password'
						id='pw2'
						value={pw2}
						placeholder='비밀번호를 재 입력하세요'
						onChange={(e) => setPw2(e.target.value)}
					/>
					<br />
					<label htmlFor='naem'>Nick Name</label>
					<div className='input_btn'>
						<input
							type='text'
							id='name'
							value={name}
							placeholder='닉네임을 입력하세요'
							onChange={(e) => setName(e.target.value)}
							onKeyUp={(e) => {
								if (e.keyCode === 13) handleNameCheck();
							}}
						/>
						<button onClick={handleNameCheck} className='btn_transPink'>
							중복검사
						</button>
					</div>
					{nameInfo.indexOf('중복') !== -1 ? (
						<div className='err'>{nameInfo}</div>
					) : (
						<div className='success'>{nameInfo}</div>
					)}

					<div className='btns'>
						<button onClick={handleJoin}>회원가입</button>
					</div>
				</article>
			</div>
		</section>
	);
}

export default Join;
