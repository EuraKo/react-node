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
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<PostImg setImg={setImg} />
					<label htmlFor='content'>Content</label>
					<textarea
						name='content'
						id='content'
						cols='30'
						rows='10'
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}></textarea>
					<div className='btns'>
						<button onClick={onSubmit}>post</button>
					</div>
				</article>
			</div>
		</section>
	);
}

export default Post;
