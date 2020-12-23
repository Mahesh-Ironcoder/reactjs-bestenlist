import React from "react";

import UserDashboard from './UserDashboard'

function User(props) {
	return (
		<div>
			Welcome user you can see all the quizes alloted to you in here
			<UserDashboard quizes={props.quizes} />
		</div>
	);
}

export default User;
