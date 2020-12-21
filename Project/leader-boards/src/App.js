// CSS file
import "./App.css";

//React Components
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

// My components
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Header from "./components/Header";
import Auth0ProviderWithHistory from "./auth/AuthWithHistory";

function PublicPage(props) {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);

	useEffect(() => {
		const getUserMetadata = async () => {
			const domain = "dev-mahesh0205.us.auth0.com";

			try {
				const accessToken = await getAccessTokenSilently({
					audience: `https://${domain}/api/v2/`,
					scope: "read:current_user",
				});

				const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

				const metadataResponse = await fetch(userDetailsByIdUrl, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const { user_metadata } = await metadataResponse.json();

				setUserMetadata(user_metadata);
			} catch (e) {
				console.log(e.message);
			}
		};

		getUserMetadata();
	}, [user]);

	return (
		isAuthenticated && (
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<h3>User Metadata</h3>
				{userMetadata ? (
					<pre>{JSON.stringify(userMetadata, null, 2)}</pre>
				) : (
					"No user metadata defined"
				)}
			</div>
		)
	);
}

function App() {
	return (
		<Router>
			<Auth0ProviderWithHistory>
				<Header />
				<Switch>
					<Route path='/user'>
						<UserDashboard />
					</Route>
					<Route path='/admin'>
						<AdminDashboard />
					</Route>
					<Route path='/'>
						<PublicPage />
					</Route>
					<Route path='*'>
						<h1>404 Page not found</h1>
					</Route>
				</Switch>
			</Auth0ProviderWithHistory>
		</Router>
	);
}

export default App;
