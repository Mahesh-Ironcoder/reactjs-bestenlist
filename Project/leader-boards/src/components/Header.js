import React, { useContext } from "react";
import { AppContext } from "../App";

function Header(props) {
	const { authContext } = useContext(AppContext);
	const { loginWithRedirect, logout, isAuthenticated, user } = authContext;
	let LoginBtn = () => {
		return (
			<button
				className='login-btn'
				onClick={() => {
					loginWithRedirect();
				}}
			>
				Login / Sign up
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
	const toggleProfilePopup = (e) => {
		let profilePopup = document.getElementById("profile-popup");
		profilePopup.classList.toggle("show-profile-popup");
	};

	return (
		<header className='app-header'>
			<nav className='navbar'>
				<section className='webpage-title'>Quizzaholics</section>
				{isAuthenticated ? (
					<>
						<img
							src={user.picture}
							alt='Profile pic'
							className='profile-link'
							onClick={(e) => {
								toggleProfilePopup(e);
							}}
						/>
						<div className='profile-popup' id='profile-popup'>
							<section className='profile-content'>
								<p>Name: {user.name}</p>
								<p>Email: {user.email}</p>
							</section>
							<LogoutBtn />
						</div>
					</>
				) : (
					<LoginBtn />
				)}
			</nav>
		</header>
	);
}

export default Header;
