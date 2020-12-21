import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import quizes from "./quizes";

const initialState = [];

function CreateQuiz() {
	const [quizQuestions, setQuizQuestions] = useState(initialState);
	const [isFinished, setIsFinished] = useState(false);
	const [title, setTitle] = useState("");
	const history = useHistory();
	console.log(quizQuestions);
	return (
		<div className='create-quiz-container'>
			{isFinished ? (
				<>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<button
						onClick={(e) => {
							setTitle(title);
							let tempobj = {
								quizid: Date(),
								title: title,
								question: quizQuestions,
							};
							quizes.push(tempobj);
							history.push("/admin");
						}}
					>
						Submit
					</button>
				</>
			) : (
				<>
					<button
						onClick={() => {
							setIsFinished(!isFinished);
						}}
					>
						Finish
					</button>
					<AddQuestion
						addQuestion={setQuizQuestions}
						quizQuestion={quizQuestions}
					/>
				</>
			)}
		</div>
	);
}

export default CreateQuiz;
