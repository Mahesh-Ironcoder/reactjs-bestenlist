import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../App";
import { QuizContext } from "./DashBoard";

import Question from "./Question";

function Quiz(props) {
	const [answer, setAnswer] = useState([]);
	const [currqtn, setCurrqtn] = useState(0);
	const { authContext } = useContext(AppContext);
	const { getAccessTokenSilently, user } = authContext;
	const history = useHistory();
	const handleAnswer = (ans, score) => {
		setAnswer([...answer, { ans: ans, qtnScore: score }]);
		if (currqtn + 1 < qtns.length) setCurrqtn(currqtn + 1);
	};
	console.log("answer", answer);
	const handleSubmit = async () => {
		console.log("Quiz submitted", answer);
		let score = 0;
		for (let i = 0; i < answer.length; i++) {
			score += answer[i].qtnScore;
		}
		console.log("score", score);
		let userResp = {
			quizid: quzid,
			userName: user.name,
			userResponse: answer,
			score: score,
		};
		console.log(userResp);
		try {
			const token = await getAccessTokenSilently({
				permissions: "read:user",
			});
			console.log(token);
			let resp = await fetch("http://localhost:3010/api/add-quiz-response", {
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(userResp),
				method: ["POST"],
			});
			let respData = await resp.json();
			console.log("add quiz resp: ", respData);
			history.push("/dashboard");
		} catch (e) {
			console.log("error from add quiz resp api: ", e);
		}
	};

	let { quzid } = useParams();
	const { quizes } = useContext(QuizContext);
	let qtns = [];
	// const qtns = quizes.filter((quz) => quz.quizid === quzid);
	for (let i = 0; i < quizes.length; i++) {
		if (quizes[i].quizid === parseInt(quzid)) {
			qtns = quizes[i].questions;
		}
	}
	console.log(qtns);

	const qtcomp = qtns.map((qtn, id) => {
		return <Question key={id} qid={id} qtn={qtn} onAnswered={handleAnswer} />;
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
