import React from "react";

function Question(props) {
	/*Handles the submit action*/
	const { question, choices, correctAnswer } = props.qtn;
	const handleSubmit = (e) => {
		e.preventDefault();
		var choiceNodes = document.getElementsByName("ans" + props.qid);
		let ans = null;
		let score = 0
		for (let i = 0; i < choiceNodes.length; i++) {
			if (choiceNodes[i].checked) {
				score = i === parseInt(correctAnswer) ? 1 : 0;
				ans = choiceNodes[i].value;
			}
		}
		props.onAnswered(ans, score);
	};

	return (
		<div className='qstn-wrapper'>
			<section className='qstn'>{question}</section>
			<form>
				{choices.map((ch, id) => {
					return (
						<section className='choice' key={id}>
							<input
								type='radio'
								name={"ans" + props.qid}
								value={ch}
								id={props.qid + "" + id}
							/>
							<label htmlFor={props.qid + "" + id}>{ch}</label>
						</section>
					);
				})}
			</form>
			<button onClick={handleSubmit}>Save</button>
		</div>
	);
}

export default Question;
