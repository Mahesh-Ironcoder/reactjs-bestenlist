// React Components
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginBtn, LogoutBtn } from "../auth/AuthenticationBtns";

function Header() {
	const { isAuthenticated } = useAuth0();
	return (
		<header className='app-header'>
			<section className='heading'>Quizzloics</section>
			<nav className='navbar' style={{ display: "inline" }}>
				<ul>
					<li>
						<Link to='/'> Home page</Link>
					</li>
					<li>
						<Link to='/user'> User</Link>
					</li>
					<li>
						<Link to='/admin'> Admin</Link>
					</li>
					<li>{isAuthenticated ? <LogoutBtn /> : <LoginBtn />}</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
