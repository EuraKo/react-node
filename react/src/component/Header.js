import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../firebase';

function Header() {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);

	return (
		<header>
			<h1>
				<NavLink to='/'>logo</NavLink>
			</h1>
			<nav id='gnb'>
				<NavLink to='/list'> List </NavLink>
				<NavLink to='/post'> Post</NavLink>
			</nav>

			<ul id='util'>
				{user.accessToken !== '' ? (
					<>
						<li
							onClick={() => {
								firebase.auth().signOut();
								navigate('/');
							}}>
							Logout
						</li>
						<li>{user.displayName}님 반갑습니다.</li>
					</>
				) : (
					<>
						<li>
							<NavLink to='/login'>login</NavLink>
						</li>

						<li>
							<NavLink to='/join'>join</NavLink>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}

export default Header;
