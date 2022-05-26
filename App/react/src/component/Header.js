import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRightFromBracket,
	faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../firebase';
const path = process.env.PUBLIC_URL;

function Header() {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);

	return (
		<header>
			<h1>
				<NavLink to='/'>
					<img src={`${path}/img/my_logo.svg`} alt='logo' />
				</NavLink>
			</h1>
			<nav id='gnb'>
				<NavLink to='/list'> NOTICE </NavLink>
				{user.displayName && <NavLink to='/post'>WRITE </NavLink>}
			</nav>

			<div id='util'>
				{user.displayName !== null && user.displayName !== '' ? (
					<>
						<div className='welcom'>
							welcome <span>'{user.displayName}'</span>.
						</div>
						<div
							className='btn_login'
							onClick={() => {
								firebase.auth().signOut();
								navigate('/');
							}}>
							<FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
						</div>
					</>
				) : (
					<>
						<div className='join'>
							<NavLink to='/join'>JOIN</NavLink>
						</div>
						<div className='btn_login'>
							<NavLink to='/login'>
								<FontAwesomeIcon icon={faArrowRightToBracket}></FontAwesomeIcon>
							</NavLink>
						</div>
					</>
				)}
			</div>
		</header>
	);
}

export default Header;
