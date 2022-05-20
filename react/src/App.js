import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './component/Header';
import Main from './component/Main';
import List from './component/List';
import Post from './component/Post';

function App() {
	const [list, setList] = useState([]);
	useEffect(() => {
		console.log(list);
	}, [list]);
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/Post' element={<Post list={list} setList={setList} />} />
			</Routes>
		</>
	);
}

export default App;
