import React from "react";

function PublicPage() {
	return (
		<div>
			<h1>Welcome to leader boar website.</h1>
			<h3>Please login to see your quizes</h3>
		</div>
	);
}

function DashBoard(props) {
	return (
		<section className='dashboard'>
			{props.authContext.isAuthenticated ? (
				<pre>{JSON.stringify(props.authContext.user, null, 2)}</pre>
			) : (
				<PublicPage />
			)}
		</section>
	);
}

export default DashBoard;
