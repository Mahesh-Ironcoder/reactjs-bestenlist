import React, { useContext, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { AppContext } from "../App";
import { QuizContext } from "./DashBoard";

import Question from "./Question";

function Quiz(props) {
	const [answer, setAnswer] = useState({});
	const [currqtn, setCurrqtn] = useState(0);
	const { getAccessTokenSilently } = useContext(AppContext);
	const handleAnswer = (qid, ans) => {
		setAnswer({ ...answer, [qid]: ans });
		if (currqtn + 1 < qtns.length) setCurrqtn(currqtn + 1);
	};

	const handleSubmit = async () => {
		console.log("Quiz submitted", answer);
		let userResp = {
			quizid: quzid,
			userResponse: answer,
		};
		try {
			const token = await getAccessTokenSilently();
			let resp = await fetch("http://localhost:3010/api/add-quiz-response", {
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(userResp),
				method: ["POST"],
			});
			console.log(resp);
			<Redirect
				to={{
					pathname: "/dashboard",
					state: { from: window.location.pathname },
				}}
			/>;
		} catch (e) {
			console.log(e);
		}
	};

	let { quzid } = useParams();
	const quizes = useContext(QuizContext);
	let qtns = [];
	for (let i = 0; i < quizes.length; i++) {
		if (quizes[i].quizid === parseInt(quzid)) {
			qtns = quizes[i].questions;
		}
	}
	// const qtns = quizes.filter((quz) => quz.quizid === quzid);
	console.log(qtns);

	const qtcomp = qtns.map((qtn, id) => {
		return (
			<Question
				key={id}
				qid={id}
				question={qtn.question}
				choices={qtn.choices}
				onAnswered={handleAnswer}
			/>
		);
	});
	console.log(Date());
	return (
		<div className='quiz'>
			<h1>{quzid}</h1>
			<h3>Question {currqtn + 1 + "/" + qtns.length}</h3>
			{currqtn + 1 === qtns.length && (
				<button className='quiz-submit' onClick={handleSubmit}>
					Submit
				</button>
			)}
			{qtcomp[currqtn]}
		</div>
	);
}

export default Quiz;
