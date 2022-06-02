import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

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
				// console.log(res);
				if (res.data.success) {
					// console.log(res.data);
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
				{!props.hideSearch && (
					<>
						<h1>NOTICE</h1>
						<div className='search_group'>
							<div className='left'>
								<button
									onClick={() => {
										setSort('new');
									}}>
									최신순
								</button>
								<button
									className='btn_green'
									onClick={() => {
										setSort('old');
									}}>
									게시순
								</button>
							</div>
							<div className='right'>
								<input
									type='text'
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									onKeyUp={(e) => {
										if (e.keyCode === 13) handleSearch();
									}}
								/>
								<button onClick={handleSearch}>SEARCH</button>
							</div>
						</div>
					</>
				)}
				{!loaded && <img src={`${process.env.PUBLIC_URL}/img/loading.gif`} />}
				<div className='list_box'>
					{list.map((post, idx) => {
						// console.log(post);
						return (
							// <>에다가 키값주려고 React.Fragment이거 씀
							<React.Fragment key={idx}>
								<article>
									<Link to={`/post/${post.postNum}`}>
										<p className='writer'>{post.writer.displayName}</p>
										<h2 className='title'>
											{/* 해당 게시글의 postNum값을 이용하여 이동 url연결 */}
											{post.title.length > 15
												? post.title.substr(0, 15) + '...'
												: post.title}
										</h2>
										<p className='desc'>
											{post.content.length > 50
												? post.content.substr(0, 30) + '...'
												: post.content}
										</p>
										<p className='date'>{moment(post.createdAt).format('L')}</p>
										{/* <p>업데이트 : {post.updatedAt}</p> */}
										{post.img !== '' && (
											<div className='has_img'>
												<FontAwesomeIcon icon={faImages} />
											</div>
										)}
									</Link>
								</article>
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default List;
