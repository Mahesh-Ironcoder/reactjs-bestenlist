import React, { useContext } from "react";
import { AppContext } from "../App";

function Profile() {
	const { authContext } = useContext(AppContext);
	const { user } = authContext;
	return <div>{JSON.stringify(user)}</div>;
}

export default Profile;
