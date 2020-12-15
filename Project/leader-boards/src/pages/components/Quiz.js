import React, { useState } from "react";
import Question from "./Question";
import { qtns } from "./questions";

function Quiz(props) {
	const [answer, setAnswer] = useState({});
	const [currqtn, setCurrqtn] = useState(0);

	const handleAnswer = (qid, ans) => {
		setAnswer({ ...answer, [qid]: ans });
		if (currqtn + 1 < qtns.length) setCurrqtn(currqtn + 1);
	};

	const handleSubmit = () => {
		console.log("Quiz submitted", answer);
	};

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

	return (
		<div className='quiz'>
			{currqtn + 1 === qtns.length && (
				<button className="quiz-submit"onClick={handleSubmit}>Submit</button>
			)}
			{qtcomp[currqtn]}
		</div>
	);
}

export default Quiz;
