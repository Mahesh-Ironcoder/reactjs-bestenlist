import React from "react";

import Quizes from "./Quizes";

function User(props) {
	return (
		<div>
			Welcome user you can see all the quizes alloted to you in here
			<Quizes quizes={props.quizes} />
		</div>
	);
}

export default User;
