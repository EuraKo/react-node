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

	useEffect(() => {
		// auth상태 변화를 감지해서 인수로 해당 상태값을 전달
		firebase.auth().onAuthStateChanged((userInfo) => {
			console.log('userInfo : ', userInfo);
		});
	}, []);

	// 로그아웃 테스트
	useEffect(() => {
		firebase.auth().signOut();
	}, []);
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
