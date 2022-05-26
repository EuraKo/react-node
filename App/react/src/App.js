import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './redux/userSlice';
import firebase from './firebase';

import Header from './component/Header';
import Main from './component/Main';
import List from './component/post/List';
import Post from './component/post/Post';
import Detail from './component/post/Detail';
import Edit from './component/post/Edit';
import Login from './component/user/Login';
import Join from './component/user/Join';

import './scss/style.scss';
import { useEffect } from 'react';

function App() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	useEffect(() => {
		// auth상태 변화를 감지해서 인수로 해당 상태값을 전달
		firebase.auth().onAuthStateChanged((userInfo) => {
			// console.log('userInfo : ', userInfo);

			// 현재 firebase로 받은 유저정보값이 있으면
			if (userInfo !== null) {
				// 해당 정보값을 dispatch로 loginUser에 액션을 생성해서 전달
				dispatch(loginUser(userInfo.multiFactor.user));
			} else {
				dispatch(logoutUser());
			}
		});
	}, []);

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/Post' element={<Post />} />
				{/* :postNum은 postNum을 주소에 전달한다는 뜻 */}
				<Route path='/post/:postNum' element={<Detail />} />
				<Route path='/edit/:postNum' element={<Edit />} />

				<Route path='/login' element={<Login />} />
				<Route path='/join' element={<Join />} />
			</Routes>
		</>
	);
}

export default App;
