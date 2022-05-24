import axios from 'axios';

function PostImg() {
	const imgUpload = (e) => {
		//입력된 파일 확인가능
		console.log(e.target.files[0]);
		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		//formData로 받아지는 형식은 xml형식이기 때문에 for of반복문으로만 확인기ㅏ능
		//console.log(formData);
		//for (const value of formData) console.log(value);
		axios
			.post('/api/post/imgUpload', formData)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return <input type='file' accept='image/*' onChange={imgUpload} />;
}

export default PostImg;