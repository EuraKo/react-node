import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';

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
						{/* 현재 로그인된 사용자와 글작성자의 아이디값이 같을때만 수정,삭제버튼 출력 */}
						{user.uid === detail.writer.uid && (
							<div className='btns'>
								<Link className='btn btn_green' to={`/edit/${detail.postNum}`}>
									Edit
								</Link>
								<button onClick={onDelete}>Delete</button>
							</div>
						)}
						<h2>{detail.title}</h2>
						<div className='write_info'>
							<div className='writer'>작성자 : {detail.writer.displayName}</div>
							<div className='date'>
								<p>작성일 : {moment(detail.createdAt).format('L LTS')}</p>
								<p>수정일 : {moment(detail.updatedAt).format('L LTS')}</p>
							</div>
						</div>
						{detail.img && (
							<img src={`https://react-jun.herokuapp.com/${detail.img}`} />
						)}
						<p>{detail.content}</p>
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
