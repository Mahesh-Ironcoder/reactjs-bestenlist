import "./App.css";
import React from "react";

import Header from "./components/Header";
import DashBoard from "./components/DashBoard";

import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
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
	// const [isLoading, setIsLoading] = useState(false);
	if (authContext.isLoading) {
		return <Loading />;
	}
	return (
		<AppContext.Provider value={{ authContext }}>
			<div className='app-container'>
				<Header authContext={authContext} />
				<Switch>
					<Route path='/profile'>
						<Profile />
					</Route>
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

// const apiReducer = (title, payload = {}) => {
// 	if (!isAuthenticated) {
// 		return new Promise((resolve, reject) => {
// 			resolve("Login required");
// 		});
// 	}
// 	let apiurl = "http://localhost:3010/api";
// 	let token;
// 	getAccessTokenSilently().then((t) => (token = t));
// 	switch (title) {
// 		case "get-quizes":
// 			console.log("get-quizes");
// 			return fetch(`${apiurl}/get-quizes/`, {
// 				headers: {
// 					"content-type": "application/json",
// 					Authorization: `Bearer ${token}`,
// 				},
// 			});
// 		case "get-top10":
// 			console.log("get-quizes");
// 			return fetch(`${apiurl}/get-top10?quizId=${payload.quizid}`, {
// 				headers: {
// 					"content-type": "application/json",
// 					Authorization: `Bearer ${token}`,
// 				},
// 			});
// 		case "add-quiz-response":
// 			console.log("get-quizes");
// 			return fetch(`${apiurl}/add-quiz-response`, {
// 				headers: {
// 					"content-type": "application/json",
// 					Authorization: `Bearer ${token}`,
// 				},
// 				body: JSON.stringify(payload.userResp),
// 				method: ["POST"],
// 			});
// 		case "delete-quiz":
// 			console.log("get-quizes");
// 			return fetch(`${apiurl}/delete-quiz`, {
// 				headers: {
// 					"content-type": "application/json",
// 					Authorization: `Bearer ${token}`,
// 				},
// 				body: JSON.stringify(payload.quizid),
// 				method: ["POST"],
// 			});
// 		default:
// 	}
// };
