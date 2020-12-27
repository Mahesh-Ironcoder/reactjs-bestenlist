import React, { useState } from "react";

function AddQuestion(props) {
	// creating states
	const { questionId, quizQuestion } = props;
	const {
		choices: localChoices = [""],
		question: localQuestion = "",
	} = quizQuestion;
	const [question, setQuestion] = useState(localQuestion);
	const [choices, setChoices] = useState(localChoices);

	// handler functions
	var handleChoiceValue = (e) => {
		var tempstate = choices.slice();

		tempstate[e.target.id.split("_ch_")[1]] = e.target.value;
		setChoices(tempstate);
	};
	var handleQuestionValue = (e) => {
		console.log("Handling the question value");
		e.preventDefault();
		setQuestion(e.target.value);
	};

	var handleAddQuestion = (e) => {
		let dropdownValue = parseInt(
			document.getElementById(`${questionId}_ans`).value
		);
		props.addQuestion({
			type: "addQuestion",
			payload: {
				id: questionId,
				question,
				choices,
				correctAnswer: dropdownValue,
			},
		});
	};
	console.log(choices.length);
	// returning the component
	return (
		<div className='create-quiz'>
			<button
				title='Add question to the quiz stack'
				className='add-question-btn'
				onClick={handleAddQuestion}
			>
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
							id={props.questionId + "_ch_" + id}
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
				<select
					className='crrct-ans'
					name='correctAnswer'
					id={`${questionId}_ans`}
				>
					{choices.map((ch, id) => {
						return (
							<option key={id} value={id}>
								{ch}
							</option>
						);
					})}
				</select>
			</section>
		</div>
	);
}

export default AddQuestion;
