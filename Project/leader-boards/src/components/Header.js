import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
				</ul>
			</nav>
		</header>
	);
}

export default Header;
