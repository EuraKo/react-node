import { NavLink } from 'react-router-dom';

function Header() {
	return (
		<header>
			<h1>
				<NavLink to='/'>logo</NavLink>
			</h1>
			<nav id='gnb'>
				<NavLink to='/list'> -List </NavLink>
				<NavLink to='/post'> -Post</NavLink>
			</nav>
		</header>
	);
}

export default Header;
