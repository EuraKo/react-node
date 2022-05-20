import { useState } from 'react';

function Post(props) {
	const [content, setContent] = useState('');

	const onSubmit = () => {
		const newList = [...props.list];
		newList.push(content);
		props.setList(newList);
		setContent('');
	};

	return (
		<section>
			<input
				type='text'
				value={content}
				onChange={(e) => {
					setContent(e.target.value);
				}}
			/>

			<button onClick={onSubmit}>post</button>
		</section>
	);
}

export default Post;
