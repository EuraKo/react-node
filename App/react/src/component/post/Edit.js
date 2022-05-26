import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostImg from './PostImg';

function Edit() {
	const params = useParams();
	const navigate = useNavigate();
	const [detail, setDetail] = useState({});
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [img, setImg] = useState('');
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
		setImg(detail.img);
	}, [detail]);

	const onEdit = () => {
		if (title === '' || content === '') {
			return alert('모든 항목을 입력하세요');
		}
		const body = {
			title: title,
			content: content,
			postNum: params.postNum,
			img: img,
		};

		axios
			.post('/api/post/edit', body)
			.then((res) => {
				if (res.data.success) {
					alert('수정완료');
					navigate(`/post/${params.postNum}`);
				} else {
					alert('수정실패');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<section id='edit'>
			<div className='inner'>
				<h1>Edit Post</h1>

				<article>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						value={title || ''} // title값이 없으면 ''를 넣겠다 이거넣어야 오류사라짐
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<PostImg setImg={setImg} img={img} page={'edit'} />
					{console.log(img)}
					<label htmlFor='content'>Content</label>
					<textarea
						name='content'
						id='content'
						cols='30'
						rows='10'
						value={content || ''}
						onChange={(e) => {
							setContent(e.target.value);
						}}></textarea>

					<div className='btns'>
						<button className='btn_transPink' onClick={() => navigate(-1)}>
							cancle
						</button>
						<button onClick={onEdit}>edit</button>
					</div>
				</article>
			</div>
		</section>
	);
}

export default Edit;
