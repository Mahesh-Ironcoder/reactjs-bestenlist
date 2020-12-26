import React, { useContext } from "react";

// import QuizContext from "./DashBoard";
import { AppContext } from "../App";

import Quizes from "./QuizesC";
import CreateQuiz from "./CreateQuiz";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Quiz from "./Quiz";

function Admin(props) {
	const { path, url } = useRouteMatch();
	const { authContext } = useContext(AppContext);
	const { getAccessTokenSilently } = authContext;
	const deleteQuiz = async (quizid) => {
		try {
			const token = await getAccessTokenSilently();
			let resp = await fetch(`http://localhost:3010/api/delete-quiz`, {
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ quizid: quizid }),
				method: "POST",
			});
			let respData = await resp.json();
			console.log("Resp data from delete quiz api: ", respData);
		} catch (e) {
			console.log("error from delete quiz api: ", e);
		}
	};
	return (
		<>
			Welcome admin here you can see all your quizes
			<Link to={`${url}/create-quiz`} className='add-quiz-btn'>
				+
			</Link>
			<Switch>
				<Route path={`${path}/create-quiz`}>
					<CreateQuiz />
				</Route>
				<Route path={`${path}/edit-quiz/:id`}>
					<CreateQuiz />
				</Route>
				<Route path={`${path}/:quzid`}>
					<Quiz url={url} />
				</Route>
				<Route path={path}>
					<Quizes url={url} delete={deleteQuiz} />
				</Route>
			</Switch>
		</>
	);
}

export default Admin;
