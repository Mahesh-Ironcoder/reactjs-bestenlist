import "./App.css";

import UserDashboard from "./components/UserDashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function PublicPage(props) {
	return <h1> Hi this is a Public home page</h1>;
}

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/user'>
					<UserDashboard />
				</Route>
				<Route path='/'>
					<PublicPage />
				</Route>
				<Route path='*'>
					<h1>404 Page not found</h1>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
