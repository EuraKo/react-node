import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function List(props) {
	const [list, setList] = useState([]);

	// 화면 로딩시 리스트 뿌리기
	useEffect(() => {
		axios
			.post('/api/post/list')
			.then((res) => {
				console.log(res);
				if (res.data.success) {
					console.log(res.data);
					setList(res.data.postList);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<section>
			<h1>list</h1>
			{list.map((post, idx) => {
				return (
					// <>에다가 키값주려고 React.Fragment이거 씀
					<React.Fragment key={idx}>
						<article>
							<h2>
								{/* 해당 게시글의 postNum값을 이용하여 이동 url연결 */}
								<Link to={`/post/${post.postNum}`}>{post.title}</Link>
							</h2>
							<p>{post.content}</p>
						</article>
						<hr />
					</React.Fragment>
				);
			})}
		</section>
	);
}

export default List;
