import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-regular-svg-icons';

function PostImg(props) {
	const [nowImg, setNowImg] = useState(''); // 신규시 이미지 경로 담는 곳
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
				setNowImg(res.data.filePath || props.img);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const nowPageFn = () => {
		console.log(nowImg, props.img);
		if (props.page === 'edit') return props.img;
		if (props.pate === 'new') return nowImg;
	};

	useEffect(() => {
		console.log(nowPageFn());
	}, []);

	return (
		<>
			<label htmlFor='file'>File</label>
			<div className='file_group'>
				<FontAwesomeIcon icon={faFileImage} className='icon' />
				<input type='file' id='file' accept='image/*' onChange={imgUpload} />
				{props.page === 'edit' ? (
					<>
						<div className='now_img'>
							{props.img !== '' && props.img !== undefined
								? props.img
								: '첨부된 이미지가 없습니다.'}
						</div>
					</>
				) : (
					<>
						<div className='now_img'>
							{nowImg !== '' && nowImg !== undefined
								? nowImg
								: '첨부된 이미지가 없습니다.'}
						</div>
					</>
				)}
			</div>
			{props.page === 'edit'
				? props.img !== '' &&
				  props.img !== undefined && (
						<div className='img_thumb'>
							<img
								src={`https://react-jun.herokuapp.com/${props.img}`}
								alt=''
							/>
						</div>
				  )
				: nowImg !== '' &&
				  nowImg !== undefined && (
						<div className='img_thumb'>
							<img src={`https://react-jun.herokuapp.com/${nowImg}`} alt='' />
						</div>
				  )}
		</>
	);
}

export default PostImg;
