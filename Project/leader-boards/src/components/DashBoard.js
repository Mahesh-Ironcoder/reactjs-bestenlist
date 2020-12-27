import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";

import Admin from "./Admin";
import Loading from "./Loading";
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
	const { authContext } = useContext(AppContext);
	const {
		isAuthenticated,
		getAccessTokenSilently,
		user,
		// isLoading,
	} = authContext;
	const [quizes, setQuizes] = useState([]);
	const [role, setRole] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const callapi = async () => {
			setIsLoading(true);
			try {
				const token = await getAccessTokenSilently({
					scope: "read:demo",
				});
				const response = await fetch(`http://localhost:3010/api/get-quizes`, {
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const responseData = await response.json();
				console.log(responseData);
				setQuizes(responseData.quizes);
				setRole(responseData.role);
				setIsLoading(false);
			} catch (error) {
				console.log("Error from get quizes api: ", error);
				setQuizes([""]);
				setIsLoading(false);
				// throw new Error(error);
			}
		};
		callapi();
	}, [user, getAccessTokenSilently, setIsLoading]);

	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className='dashboard'>
			<QuizContext.Provider value={{ quizes, role }}>
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
		</div>
	);
}

export default DashBoard;
