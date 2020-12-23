import React, { useContext } from "react";
// import { quizes } from "./quizes";
import { Link } from "react-router-dom";
import { QuizContext } from "./DashBoard";
// import Quiz from "./Quiz";

function QuizCard(props) {
	return (
		<section className='quiz-card'>
			<h2>{props.quiz.title}</h2>
			<Link
				className='card-button'
				to={`${props.currUrl}/${props.quiz.quizid}`}
				onClick={() => console.log("quiz card link clicked", Date())}
			>
				Take test
			</Link>
		</section>
	);
}
function Quizes(props) {
	const quizes = useContext(QuizContext);
	// console.log(path);
	return (
		<div className='user-dashboard'>
			{quizes.map((quz, id) => {
				return <QuizCard key={id} quiz={quz} currUrl={props.url} />;
			})}
		</div>
	);
}

export default Quizes;
