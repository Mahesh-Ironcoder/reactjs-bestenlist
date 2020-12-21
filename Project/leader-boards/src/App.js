import "./App.css";

// import UserDashboard from "./components/UserDashboard";
// import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";

// function PublicPage(props) {
// 	return <h1> Hi this is a Public home page</h1>;
// }

function App() {
	return (
		<div className='app-container'>
			<Header />
			<DashBoard />
		</div>
	);
}

export default App;
