import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; //특정페이지로 이동하거나 백하는거
import PostImg from './PostImg';

function Post() {
	const user = useSelector((store) => store.user);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [img, setImg] = useState(''); // 업로드된 이미지 저장경로가 담길 state
	const navigate = useNavigate();

	// 로그인하지 않은 사용자가 접속시 강제로 로그인화면으로 이동
	useEffect(() => {
		if (user.accessToken === '') {
			alert('로그인된 회원만 글을 입력할 수 있습니다.');
			navigate('/login');
		}
	}, []);

	const onSubmit = () => {
		if (title === '' || content === '') {
			return alert('모든항목을 입력하세요');
		}

		const body = {
			title: title,
			content: content,
			img: img,
			uid: user.uid, // 컴포넌트에서 uid정보값
		};

		axios
			.post('/api/post/submit', body)
			.then((res) => {
				if (res.data.success) {
					alert('글작성이 완료되었습니다.');
					navigate('/list');
				} else {
					alert('글작성에 실패했어요');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<section id='post'>
			<div className='inner'>
				<h1>Write Post</h1>
				<article>
					<label htmlFor='title'></label>
					<input
						type='text'
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<PostImg setImg={setImg} />
					<label htmlFor='content'>본문</label>
					<textarea
						name='content'
						id='content'
						cols='30'
						rows='10'
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}></textarea>
					<button onClick={onSubmit}>post</button>
				</article>
			</div>
		</section>
	);
}

export default Post;
