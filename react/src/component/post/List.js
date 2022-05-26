import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';

function List(props) {
	const [list, setList] = useState([]);
	const [loaded, setLoaded] = useState(false);

	// 화면 로딩시 리스트 뿌리기
	useEffect(() => {
		axios
			.post('/api/post/list')
			.then((res) => {
				console.log(res);
				if (res.data.success) {
					console.log(res.data);
					setList(res.data.postList);
					setLoaded(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<section id='list'>
			<div className='inner'>
				<h1>list</h1>
				{!loaded && <img src={`${process.env.PUBLIC_URL}/img/loading.gif`} />}
				{list.map((post, idx) => {
					console.log(post);
					return (
						// <>에다가 키값주려고 React.Fragment이거 씀
						<React.Fragment key={idx}>
							<article>
								<h2>
									{/* 해당 게시글의 postNum값을 이용하여 이동 url연결 */}
									<Link to={`/post/${post.postNum}`}>{post.title}</Link>
								</h2>
								<p>{post.content}</p>
								<p>writer: {post.writer.displayName}</p>
								<p>
									작성일 :
									{moment(post.createdAt).format('YYYY MMMM Do, a hh:mm:ss')}
								</p>
								<p>업데이트 : {post.updatedAt}</p>
							</article>
						</React.Fragment>
					);
				})}
			</div>
		</section>
	);
}

export default List;
