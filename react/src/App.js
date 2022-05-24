import { Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Main from './component/Main';
import List from './component/post/List';
import Post from './component/post/Post';
import Detail from './component/post/Detail';
import Edit from './component/post/Edit';

import './scss/style.scss';

function App() {
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
			</Routes>
		</>
	);
}

export default App;
