import { useState, useEffect } from 'react';
import axios from 'axios';

function List(props) {
	const [text, setText] = useState('');
	const body = { text: 'world' };
	useEffect(() => {
		// 포스트 요청시 첫번째 인수는 요청 라우터, 두번째 인수로 전달할 값
		axios
			.post('/api/test', body)
			.then((res) => {
				console.log(res.data.text);
				setText(res.data.text);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<section>
			<h1>list</h1>
			<h2>{text}</h2>
			{props.list.map((item, idx) => {
				return <article key={idx}>{item}</article>;
			})}
		</section>
	);
}

export default List;
