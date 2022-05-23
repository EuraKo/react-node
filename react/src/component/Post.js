import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //특정페이지로 이동하거나 백하는거

function Post(props) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	const onSubmit = () => {
		if (title === '' || content === '') {
			return alert('모든항목을 입력하세요');
		}

		const body = {
			title: title,
			content: content,
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
		<section>
			<label htmlFor='title'></label>
			<input
				type='text'
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
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
		</section>
	);
}

export default Post;
