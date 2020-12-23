import React, { useState } from "react";

function AddQuestion(props) {
	// creating states
	const [question, setQuestion] = useState("");
	const [choices, setChoices] = useState([""]);

	// handler functions
	var handleChoiceValue = (e) => {
		var tempstate = choices.slice();
		tempstate[e.target.id] = e.target.value;
		setChoices(tempstate);
	};
	var handleQuestionValue = (e) => {
		console.log("Handling the question value");
		e.preventDefault();
		setQuestion(e.target.value);
	};

	var handleAddQuestion = (e) => {
		props.addQuestion([
			...props.quizQuestion,
			{ question: question, choices: choices },
		]);
		setQuestion("");
		setChoices([""]);
	};

	// returning the component
	return (
		<div className='create-quiz'>
			<button className='add-question-btn' onClick={handleAddQuestion}>
				Add Question
			</button>
			<input
				type='text'
				value={question}
				onChange={handleQuestionValue}
				placeholder='Question'
			/>
			<section className='ch-container'>
				{choices.map((ch, id) => {
					return (
						<input
							key={id}
							id={id}
							type='text'
							value={ch}
							onChange={handleChoiceValue}
							placeholder='your option'
							className='qtnoption'
						/>
					);
				})}
				<button
					className='add-choice'
					onClick={(e) => {
						e.preventDefault();
						var tempstate = choices.slice();
						tempstate.push("");
						setChoices(tempstate);
					}}
				>
					Add Choice
				</button>
			</section>
		</div>
	);
}

export default AddQuestion;
