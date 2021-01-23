import "./App.css";
import React from "react";

import Header from "./components/Header";
import DashBoard from "./components/DashBoard";

import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";

function PublicPage(props) {
	return (
		<div className>
			<h2>Hey There! Welcome to Quizzaholics</h2>

			<p>
				Login or create an account to compete with your colleuges and friends in
				quizes that your mentor assigned for{" "}
			</p>
			<p>
				Want to create quizes...sure thing! Login with an administrator account
				to create or edit your quizes
			</p>
		</div>
	);
}

export const AppContext = React.createContext();

function App() {
	const authContext = useAuth0();
	if (authContext.isLoading) {
		return <Loading />;
	}
	return (
		<AppContext.Provider value={{ authContext }}>
			<div className='app-container'>
				<Header authContext={authContext} />
				<Switch>
					<Route path='/dashboard'>
						<DashBoard />
					</Route>
					<Route path='/'>
						<PublicPage />
					</Route>
				</Switch>
				{/* {authContext. */}
			</div>
		</AppContext.Provider>
		// <Loading />
	);
}

export default App;
