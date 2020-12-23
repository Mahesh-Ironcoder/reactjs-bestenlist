import React, { useState, useEffect } from "react";

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

function DashBoard(props) {
	const { isAuthenticated, getAccessTokenSilently, user } = props.authContext;
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
			{isAuthenticated ? (
				role === "admin" ? (
					<Admin quizes={quizes} />
				) : (
					<User quizes={quizes} />
				)
			) : (
				<PublicPage />
			)}
		</section>
	);
}

export default DashBoard;
