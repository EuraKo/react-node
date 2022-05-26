import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from '../../firebase';

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	// 에러 상황별 메세지가 담길 state
	const [errMsg, setErrMsg] = useState('');

	// 로그인 인증 유무 함수 정의
	const handleLogin = async () => {
		if (!(email && pw)) return alert('모든값을 입력하세요');

		try {
			await firebase.auth().signInWithEmailAndPassword(email, pw);
			navigate('/');
		} catch (err) {
			console.dir(err.code);
			if (err.code === 'auth/user-not-found') {
				setErrMsg('존재하지 않는 메일입니다.');
			} else if (err.code === 'auth/wrong-password') {
				setErrMsg('비밀번호가 일치하지 않습니다.');
			} else if (err.code === 'auth/invalid-email') {
				setErrMsg('이메일 형식이 아닙니다.');
			} else {
				setErrMsg('로그인에 실패했습니다.');
			}
		}
	};

	return (
		<section id='login'>
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
						placeholder='이메일을 입력하세요'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br />
					<label htmlFor='pw'>Password</label>
					<input
						type='password'
						value={pw}
						id='pw'
						placeholder='비밀번호를 입력하세요'
						onChange={(e) => setPw(e.target.value)}
						onKeyUp={(e) => {
							if (e.keyCode === 13) handleLogin();
						}}
					/>
					<br />
					<div className='btns'>
						<button className='btn_transPink' onClick={handleLogin}>
							login
						</button>
						<button
							onClick={() => {
								navigate('/join');
							}}>
							join
						</button>
					</div>
					{errMsg !== '' && <p className='err'>{errMsg}</p>}
				</article>
			</div>
		</section>
	);
}

export default Login;
