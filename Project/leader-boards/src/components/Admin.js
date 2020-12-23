import React from "react";

// import QuizContext from "./DashBoard";

import Quizes from "./QuizesC";
import CreateQuiz from "./CreateQuiz";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Quiz from "./Quiz";

function Admin(props) {
	const { path, url } = useRouteMatch();
	return (
		<div>
			Welcome admin here you can see all your quizes
			<Link to={`${url}/create-quiz`} className='add-quiz-btn'>
				+
			</Link>
			<Switch>
				<Route path={`${path}/create-quiz`}>
					<CreateQuiz />
				</Route>
				<Route path={`${path}/:quzid`}>
					<Quiz url={url} />
				</Route>
				<Route path={path}>
					<Quizes url={url}/>
				</Route>
			</Switch>
		</div>
	);
}

export default Admin;
