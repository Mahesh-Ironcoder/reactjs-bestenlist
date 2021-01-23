import React from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import Quizes from "./QuizesC";
import Quiz from "./Quiz";

function User(props) {
	const { path, url } = useRouteMatch();
	return (
		<>
			<h3>Welcome you can see all the quizes alloted to you in here</h3>
			<Switch>
				<Route path={`${path}/:quzid`}>
					<Quiz url={url} />
				</Route>
				<Route path={path}>
					<Quizes url={url} />
				</Route>
			</Switch>
		</>
	);
}

export default User;
