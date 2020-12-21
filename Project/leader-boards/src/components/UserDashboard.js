/* fromPackages*/
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

// from Components
import Quiz from "./Quiz";
import QuizCard from './QuizCard'

// from Objects
import quizes from "./quizes";
import { qtns } from "./questions";

function UserDashboard() {
	const { path, url } = useRouteMatch();

	return (
		<>
			<Switch>
				<Route path={`${path}/:quizid`}>
					<Quiz qtns={qtns} />
				</Route>
				<Route path={path}>
					<div className='dashboard'>
						{quizes.map((quz) => {
							return <QuizCard key={quz.quizid} quiz={quz} curURL={url} />;
						})}
					</div>
				</Route>
			</Switch>
		</>
	);
}

export default UserDashboard;
