import "./App.css";

// import UserDashboard from "./components/UserDashboard";
// import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import CreateQuiz from "./components/CreateQuiz";

// function PublicPage(props) {
// 	return <h1> Hi this is a Public home page</h1>;
// }

function App() {
	const authContext = useAuth0();
	return (
		<div className='app-container'>
			<Header authContext={authContext} />
			<Switch>

				<Route path='/create-quiz'>
					<CreateQuiz authContext={authContext} />
				</Route>
				<Route path='/quiz-questions'></Route>
				<Route exact path='/'>
					<DashBoard authContext={authContext} />
				</Route>
			</Switch>
			{/* {authContext. */}
		</div>
	);
}

export default App;
