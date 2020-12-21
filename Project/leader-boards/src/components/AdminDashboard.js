// React Components
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// My Components
import QuizCard from "./QuizCard";
import CreateQuiz from "./CreateQuiz";

//from Objects
import quizes from "./quizes";

function AdminDashboard() {
	const { path, url } = useRouteMatch();
	return (
		<Switch>
			<Route path={`${path}/create-quiz`}>
				<CreateQuiz />
			</Route>
			<Route path={path}>
				<div className='dashboard'>
					<Link to={`${url}/create-quiz`} className='add-quiz-btn'>
						+
					</Link>
					{quizes.map((quz) => {
						return <QuizCard key={quz.quizid} quiz={quz} curURL={url} />;
					})}
				</div>
			</Route>
		</Switch>
	);
}

export default AdminDashboard;
