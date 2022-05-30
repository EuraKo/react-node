import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-regular-svg-icons';

function PostImg(props) {
	console.log(props.img);
	const [imgSrc, setImgSrc] = useState(props.img || ''); // 이미지 이름만

	const onlyName = (src) => {
		let imgName = src.split('/');
		imgName = imgName[imgName.length - 1];
		// setImgSrc(imgName);
		props.setImgName(imgName);
		console.log(imgName);
	};

	const imgUpload = (e) => {
		//입력된 파일 확인가능
		if (e.target.files[0] === undefined) {
			return;
		}
		console.log(e.target.files[0]);
		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		//formData로 받아지는 형식은 xml형식이기 때문에 for of반복문으로만 확인가능
		// console.log(formData);
		// for (const value of formData) console.log(value);
		axios
			.post('/api/post/imgUpload', formData)
			.then((res) => {
				props.setImg(res.data.filePath || props.img);
				onlyName(res.data.filePath);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// useEffect(() => {
	// 	console.log('start');
	// 	console.log(props.img);
	// 	onlyName(props.img);
	// }, []);

	return (
		<>
			<label htmlFor='file'>File</label>
			<div className='file_group'>
				<FontAwesomeIcon icon={faFileImage} className='icon' />
				<input type='file' id='file' accept='image/*' onChange={imgUpload} />
				<div className='now_img'>
					{props.img !== '' && props.img !== undefined
						? props.imgName
						: '첨부된 이미지가 없습니다.'}
				</div>
			</div>
			{props.img !== '' && props.img !== undefined && (
				<div className='img_thumb'>
					<img src={props.img} alt='' />
				</div>
			)}
		</>
	);
}

export default PostImg;
