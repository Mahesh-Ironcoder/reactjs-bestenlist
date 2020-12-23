import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddQuestion from "./AddQuestion";
// import quizes from "./quizes";

import { useAuth0 } from "@auth0/auth0-react";

const initialState = [];

function CreateQuiz() {
	const [quizQuestions, setQuizQuestions] = useState(initialState);
	const [isFinished, setIsFinished] = useState(false);
	const [title, setTitle] = useState("");
	const history = useHistory();

	const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

	const sendResponses = async (obj) => {
		if (isAuthenticated) {
			let token = await getAccessTokenSilently({
				scope: "read:demo",
			});
			try {
				var resp = await fetch("http://localhost:3010/api/create-quiz", {
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(obj),
					method: ["POST"],
				});
			} catch (e) {
				console.log(e);
			}
			console.log("Create quiz response: ", resp);
		}
	};
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
						className='add-quiz-btn'
						onClick={(e) => {
							setTitle(title);
							let tempobj = {
								quizid: Date.now(),
								creatorId: user.sub,
								title: title,
								questions: quizQuestions,
								responses: [],
							};
							sendResponses(tempobj);
							history.push("/");
						}}
					>
						Submit
					</button>
				</>
			) : (
				<>
					<button
						className='quiz-finish'
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