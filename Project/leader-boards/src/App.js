import "./App.css";

// import UserDashboard from "./components/UserDashboard";
// import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";

import { useAuth0 } from "@auth0/auth0-react";

// function PublicPage(props) {
// 	return <h1> Hi this is a Public home page</h1>;
// }

function App() {
	const authContext = useAuth0();
	return (
		<div className='app-container'>
			<Header authContext={authContext} />
			<DashBoard authContext={authContext} />
		</div>
	);
}

export default App;
