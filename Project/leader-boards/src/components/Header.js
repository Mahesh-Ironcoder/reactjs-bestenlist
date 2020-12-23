import React from "react";
// import { Link } from "react-router-dom";

function Header(props) {
	const { loginWithRedirect, logout, isAuthenticated } = props.authContext;
	let LoginBtn = () => {
		return (
			<button
				className='login-btn'
				onClick={() => {
					loginWithRedirect();
				}}
			>
				Login
			</button>
		);
	};
	let LogoutBtn = () => {
		return (
			<button
				className='logout-btn'
				onClick={() => {
					logout({ redirectTo: "window.location.origin" });
				}}
			>
				Logout
			</button>
		);
	};
	return (
		<header className='app-header'>
			<section className='heading'>Quizzloics</section>
			<nav className='navbar' style={{ display: "inline" }}>
				<ul>
					<li>
						{isAuthenticated ? <LogoutBtn /> : <LoginBtn />}
						{/* <Link to='/'> Home page</Link> */}
					</li>
					<li>{/* <Link to='/user'> User</Link> */}</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
