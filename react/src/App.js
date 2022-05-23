import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './component/Header';
import Main from './component/Main';
import List from './component/List';
import Post from './component/Post';
import Detail from './component/Detail';

import './scss/style.scss';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/Post' element={<Post />} />
				<Route path='/post/:postNum' element={<Detail />} />
			</Routes>
		</>
	);
}

export default App;
