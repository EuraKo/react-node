import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Deatail() {
	// 라우터 파라미터 넘어온 값을 받음
	const params = useParams();
	// console.log(params);
	// 서버에서 넘어온 상세 게시글 정보가 담길 state
	const [detail, setDetail] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		// 파라미터로 넘어온 값을 객체로 만듬
		const body = {
			postNum: params.postNum,
		};

		axios
			// 서버쪽에 postNum을 전달하며 포스트 요청
			.post('/api/post/detail', body)
			.then((res) => {
				// console.log(res);
				if (res.data.success) {
					// console.log(res.data.post);
					// 받아진 데이터 state에 옮겨담음
					setDetail(res.data.post);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		// console.log(detail);
	}, [detail]);

	const onDelete = () => {
		if (window.confirm('정말삭제하겠습니까?')) {
			const body = {
				postNum: params.postNum,
			};

			axios
				.post('/api/post/delete', body)
				.then((res) => {
					console.log(res);
					if (res.data.success) {
						alert('게시글이 삭제되었습니다.');
						navigate('/list');
					}
				})
				.catch((err) => {
					alert('게시글식제에 실패했습니다.');
					navigate('/list');
				});
		}
	};

	return (
		<section id='detail'>
			<div className='inner'>
				<h1>view detail</h1>
				<article>
					<h2>{detail.title}</h2>
					<p>{detail.content}</p>
					<ul className='btns'>
						<li>
							<Link to={`/edit/${detail.postNum}`}>Edit</Link>
						</li>
						<li onClick={onDelete}>Delete</li>
					</ul>
				</article>
			</div>
		</section>
	);
}

export default Deatail;
