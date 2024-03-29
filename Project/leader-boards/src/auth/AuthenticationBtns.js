import { useAuth0 } from "@auth0/auth0-react";
function LoginBtn() {
	const { loginWithRedirect } = useAuth0();
	return (
		<button
			onClick={() => {
				loginWithRedirect({
					returnTo: "/user",
				});
			}}
		>
			Login
		</button>
	);
}
function LogoutBtn() {
	const { logout } = useAuth0();

	return (
		<button
			onClick={() => {
				logout({
					returnTo: window.location.origin,
				});
			}}
		>
			Logout
		</button>
	);
}

export { LoginBtn, LogoutBtn };
