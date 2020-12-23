import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";

import Admin from "./Admin";
import User from "./User";

function PublicPage() {
	return (
		<div>
			<h1>Welcome to leader boar website.</h1>
			<h3>Please login to see your quizes</h3>
		</div>
	);
}

export const QuizContext = React.createContext();

function DashBoard(props) {
	const { isAuthenticated, getAccessTokenSilently, user } = useContext(
		AppContext
	);
	const [quizes, setQuizes] = useState([]);
	const [role, setRole] = useState("");
	useEffect(() => {
		console.log("use effect effecting now!");
		const callapi = async () => {
			try {
				const token = await getAccessTokenSilently({
					scope: "read:demo",
				});
				console.log(token);

				const response = await fetch(`http://localhost:3010/api/get-quizes`, {
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const responseData = await response.json();
				console.log(responseData.quizes);
				setQuizes(responseData.quizes);
				setRole(responseData.role);
			} catch (error) {
				console.log(error);
				setQuizes(error.message);
			}
		};
		callapi();
	}, [user]);
	return (
		<section className='dashboard'>
			<QuizContext.Provider value={quizes}>
				{isAuthenticated ? (
					role === "admin" ? (
						<Admin quizes={quizes} />
					) : (
						<User quizes={quizes} />
					)
				) : (
					<PublicPage />
				)}
			</QuizContext.Provider>
		</section>
	);
}

export default DashBoard;
