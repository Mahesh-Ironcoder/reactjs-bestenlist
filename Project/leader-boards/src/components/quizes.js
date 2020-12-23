import React from "react";
// import { quizes } from "./quizes";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Quiz from "./Quiz";
import { qtns } from "./questions";

function QuizCard(props) {
	return (
		<section className='quiz-card'>
			<h2>{props.quiz.title}</h2>
			<Link
				className='card-button'
				to={`${props.curURL}/${props.quiz.quizid}`}
				onClick={() => console.log("quiz card link clicked", Date())}
			>
				Take test
			</Link>
		</section>
	);
}
function Quizes(props) {
	const { path, url } = useRouteMatch();
	const { quizes } = props;
	return (
		<>
			<Switch>
				<Route path={`${path}/:quizid`}>
					<Quiz qtns={qtns} />
				</Route>
				<Route path={path}>
					<div className='user-dashboard'>
						{quizes.map((quz, id) => {
							return <QuizCard key={id} quiz={quz} curURL={url} />;
						})}
					</div>
				</Route>
			</Switch>
		</>
	);
}

export default Quizes;
