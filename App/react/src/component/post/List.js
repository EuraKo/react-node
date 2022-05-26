import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';

function List(props) {
	const [list, setList] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [sort, setSort] = useState('new');
	const [search, setSearch] = useState('');

	const getList = () => {
		let num = 0;
		if (props.count) num = props.count;
		const body = {
			sort: sort,
			search: search,
			count: num,
		};
		axios
			.post('/api/post/list', body)
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
	};

	const handleSearch = () => {
		getList();
	};
	// 화면 로딩시 리스트 뿌리기
	useEffect(getList, [sort]);

	return (
		<section id='list'>
			<div className='inner'>
				{!loaded && <img src={`${process.env.PUBLIC_URL}/img/loading.gif`} />}

				{!props.hideSearch && (
					<>
						<h1>list</h1>
						<button
							onClick={() => {
								setSort('new');
							}}>
							최신순
						</button>
						<button
							onClick={() => {
								setSort('old');
							}}>
							게시순
						</button>
						<input
							type='text'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onKeyUp={(e) => {
								if (e.keyCode === 13) handleSearch();
							}}
						/>
					</>
				)}

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