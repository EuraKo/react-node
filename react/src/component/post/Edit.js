import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Edit() {
	const params = useParams();
	const navigate = useNavigate();
	const [detail, setDetail] = useState({});
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	//처음 컴포넌트 마운트시 수정할 데이터를 불러와서 detail에 담음
	useEffect(() => {
		const body = { postNum: params.postNum };
		axios
			.post('/api/post/detail', body)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.post);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	//detail state변경시 해당 값에서 title, content내용 옮겨담음
	useEffect(() => {
		setTitle(detail.title);
		setContent(detail.content);
	}, [detail]);

	return (
		<section id='edit'>
			<div className='inner'>
				<h1>Edit Post</h1>

				<article>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>

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

					<button>edit</button>
				</article>
			</div>
		</section>
	);
}

export default Edit;
