import React, { useContext, useState } from "react";
// import { quizes } from "./quizes";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { QuizContext } from "./DashBoard";
// import Quiz from "./Quiz";

function QuizCard(props) {
	// const [seeRankings, setSeeRankings] = useState(false);
	const [rankings, setRankings] = useState([]);
	const { authContext } = useContext(AppContext);
	const { getAccessTokenSilently } = authContext;
	const { role } = props;
	const getRankings = async (quizid) => {
		try {
			const token = await getAccessTokenSilently();
			let resp = await fetch(
				`http://localhost:3010/api/get-top10?quizId=${quizid}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const respData = await resp.json();
			let tempvar = [...respData["top10"]];
			setRankings(tempvar);
			let rankingsDiv = document.getElementById("rankings-container");
			rankingsDiv.classList.add("show-rankings-container");
			// setSeeRankings(true);
		} catch (e) {
			// setRankings(e.message);
			console.log("error from get top10 api: ", e);
			throw new Error(e);
		}
	};

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
			{role === "admin" && (
				<>
					<Link
						className='card-button'
						to={`/dashboard/edit-quiz/${props.quiz.quizid}`}
						onClick={() => console.log("quiz card link:edit clicked", Date())}
					>
						Edit test
					</Link>

					<button
						className='card-button'
						onClick={() => {
							console.log("quiz card link:delete clicked", Date());
							props.delete(props.quiz.quizid);
						}}
					>
						Delete Quiz
					</button>
				</>
			)}
			<button
				className='card-button'
				onClick={() => {
					console.log("quiz card link:ranking clicked", Date());
					getRankings(props.quiz.quizid);
				}}
			>
				Rankings
			</button>
			<section className='rankings-container' id='rankings-container'>
				<div
					className='rankings-close'
					onClick={() => {
						let rankingsDiv = document.getElementById("rankings-container");
						rankingsDiv.classList.remove("show-rankings-container");
					}}
				>
					X
				</div>
				<span className='posH'>#</span>
				<span className='nameH'>Name</span>
				<span className='scoreH'>Score</span>
				{rankings.map((rank, id) => (
					<>
						<span className='posH'>{id + 1}</span>
						<span className='nameH'>{rank.userName}</span>
						<span className='scoreH'>{rank.score}</span>
					</>
				))}
			</section>
		</section>
	);
}
function Quizes(props) {
	const { quizes = [], role } = useContext(QuizContext);
	console.log(quizes);
	return (
		<div className='quiz-cards'>
			{quizes.map((quz, id) => {
				return (
					<QuizCard
						key={id}
						quiz={quz}
						currUrl={props.url}
						delete={props.delete}
						role={role}
					/>
				);
			})}
		</div>
	);
}

export default Quizes;
