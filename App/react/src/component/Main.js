import List from './post/List';

function Main() {
	return (
		<section id='main'>
			<div className='inner'>
				<h1>Hello !</h1>
				<h2>최근 등록 글</h2>
			</div>
			<List count={4} hideSearch={true} />
		</section>
	);
}

export default Main;
