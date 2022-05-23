import { useParams } from 'react-router-dom';

function Deatail() {
	// 라우터 파라미터 넘어온 값을 받음
	const params = useParams();
	console.log(params);

	return (
		<section>
			<article>
				<h2>Detail</h2>
				<p>{params.postNum}</p>
			</article>
		</section>
	);
}

export default Deatail;
