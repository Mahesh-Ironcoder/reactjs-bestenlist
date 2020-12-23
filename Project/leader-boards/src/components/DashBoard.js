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
	// console.log("user: ", user);
	const [quizes, setQuizes] = useState([]);
	const [role, setRole] = useState("");
	// const { name = "Guest", picture = null } = !isAuthenticated ? {} : user;
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
					// body: JSON.stringify({
					// 	demo: "HI",
					// }),
					// method: "POST",
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
	console.log(quizes, "\n", role);
	return (
		// <section className='dashboard'>
		// 	{isAuthenticated ? (
		// 		// isAdmin && (
		// 		<>
		// 			<img src={picture} alt='userpicture' />
		// 			<h1>Welcome {name}</h1>
		// 			<pre>{JSON.stringify(props.authContext.user, null, 2)}</pre>
		// 			<button onClick={callapi}>Call API</button>
		// 			{message}
		// 		</>
		// 	) : (
		// 		<>
		// 			<PublicPage />
		// 			<button onClick={callapi}>Call API</button>
		// 			{message}
		// 		</>
		// 	)}
		// </section>
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
