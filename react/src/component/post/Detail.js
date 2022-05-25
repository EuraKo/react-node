import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Detail() {
	const params = useParams();
	const navigate = useNavigate();
	const [detail, setDetail] = useState({});
	const [loaded, setLoaded] = useState(false);
	const user = useSelector((store) => store.user);

	useEffect(() => {
		const body = {
			postNum: params.postNum,
		};

		axios
			.post('/api/post/detail', body)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.post);
					setLoaded(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onDelete = () => {
		console.log(params.postNum);

		if (window.confirm('정말 삭제하겠습니까?')) {
			const body = {
				postNum: params.postNum,
			};

			axios
				.post('/api/post/delete', body)
				.then((res) => {
					if (res.data.success) {
						alert('게시글이 삭제되었습니다.');
						navigate('/list');
					}
				})
				.catch((err) => {
					alert('게시글 삭제에 실패했습니다.');
				});
		}
	};

	return (
		<section id='detail'>
			<div className='inner'>
				<h1>View Detail</h1>
				{loaded ? (
					<article>
						<h2>{detail.title}</h2>
						{detail.img && <img src={`http://localhost:5000/${detail.img}`} />}
						<p>{detail.content}</p>

						<span>Writer: {detail.writer.displayName}</span>
						{user.uid === detail.writer.uid && (
							<ul className='btns'>
								<li>
									<Link to={`/edit/${detail.postNum}`}>Edit</Link>
								</li>
								<li onClick={onDelete}>Delete</li>
							</ul>
						)}
					</article>
				) : (
					<img
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
						alt='loading'
						className='loading'
					/>
				)}
			</div>
		</section>
	);
}

export default Detail;
