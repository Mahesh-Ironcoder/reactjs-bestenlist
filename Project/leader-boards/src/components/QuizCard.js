//React component
import { Link } from "react-router-dom";

export default function QuizCard(props) {
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
