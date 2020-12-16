import React, { useState } from "react";
import Question from "./Question";
import { useParams} from 'react-router-dom'

function Quiz(props) {
	const [answer, setAnswer] = useState({});
	const [currqtn, setCurrqtn] = useState(0);

	const handleAnswer = (qid, ans) => {
		setAnswer({ ...answer, [qid]: ans });
		if (currqtn + 1 < props.qtns.length) setCurrqtn(currqtn + 1);
	};

	const handleSubmit = () => {
		console.log("Quiz submitted", answer);
	};

	const qtcomp = props.qtns.map((qtn, id) => {
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
	const { quizid } = useParams();
	console.log(Date())
	return (
		<div className='quiz'>
			<h1>{quizid}</h1>
			<h3>Question {(currqtn+1)+"/"+props.qtns.length}</h3>
			{currqtn + 1 === props.qtns.length && (
				<button className="quiz-submit"onClick={handleSubmit}>Submit</button>
			)}
			{qtcomp[currqtn]}
		</div>
	);
}

export default Quiz;
