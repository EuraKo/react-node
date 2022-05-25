import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');

	return (
		<section id='login'>
			<div className='inner'>
				<article>
					<div className='inner'>
						<h2>Login</h2>

						<input
							type='email'
							value={email}
							placeholder='이메일을 입력하세요'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<br />
						<input
							type='password'
							value={pw}
							placeholder='비밀번호를 입력하세요'
							onChange={(e) => setPw(e.target.value)}
						/>
						<br />
						<button>login</button>
						<button
							onClick={() => {
								navigate('/join');
							}}>
							join
						</button>
					</div>
				</article>
			</div>
		</section>
	);
}

export default Login;
