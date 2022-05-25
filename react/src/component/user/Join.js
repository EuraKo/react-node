import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pw1, setPw1] = useState('');
	const [pw2, setPw2] = useState('');
	const [name, setName] = useState('');

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
						placeholder='이메일을 입력하세요'
						onChange={(e) => setName(e.target.value)}
					/>
					<br />
					<button>회원가입</button>
				</article>
			</div>
		</section>
	);
}

export default Join;
