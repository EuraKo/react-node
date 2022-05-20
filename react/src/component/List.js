function List(props) {
	return (
		<section>
			<h1>list</h1>
			{props.list.map((item, idx) => {
				return <article key={idx}>{item}</article>;
			})}
		</section>
	);
}

export default List;
