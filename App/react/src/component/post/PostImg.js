import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-regular-svg-icons';

function PostImg(props) {
	const imgUpload = (e) => {
		//입력된 파일 확인가능
		if (e.target.files[0] === undefined) {
			return;
		}
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
				props.setImg(res.data.filePath);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<label htmlFor='file'>File</label>
			<div className='file_group'>
				<FontAwesomeIcon icon={faFileImage} className='icon' />
				<input type='file' id='file' accept='image/*' onChange={imgUpload} />
				<div className='now_img'>
					{props.img !== '' && props.img !== undefined
						? props.img
						: '첨부된 이미지가 없습니다.'}
				</div>
			</div>
			{props.img !== '' && props.img !== undefined && (
				<div className='img_thumb'>
					<img src={`https://react-jun.herokuapp.com/${props.img}`} alt='' />
				</div>
			)}
		</>
	);
}

export default PostImg;
