import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<h1>
				<Link to='/'>logo</Link>
			</h1>
			<nav id='gnb'>
				<Link to='/list'> -List </Link>
				<Link to='/post'> -Post</Link>
			</nav>
		</header>
	);
}

export default Header;
