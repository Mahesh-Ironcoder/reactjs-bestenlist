import "./App.css";
import React from 'react'

// import UserDashboard from "./components/UserDashboard";
// import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";
import CreateQuiz from "./components/CreateQuiz";

import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";

function PublicPage(props) {
	return <h1> Hi this is a Public home page</h1>;
}

export const AppContext = React.createContext();

function App() {
	const authContext = useAuth0();
	return (
		<AppContext.Provider value={authContext}>
			<div className='app-container'>
				<Header authContext={authContext} />
				<Switch>
					<Route path='/create-quiz'>
						<CreateQuiz authContext={authContext} />
					</Route>
					<Route path='/dashboard'>
						<DashBoard authContext={authContext} />
					</Route>
					<Route path='/'>
						<PublicPage />
					</Route>
				</Switch>
				{/* {authContext. */}
			</div>
		</AppContext.Provider>
	);
}

export default App;
