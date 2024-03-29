import React, { useContext, useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import AddQuestion from "./AddQuestion";

import { useAuth0 } from "@auth0/auth0-react";
import { QuizContext } from "./DashBoard";

Array.prototype.addQuestionObj = function (obj) {
	console.log("entered prototype func");
	for (const it of this.values()) {
		if (it.questionId === obj.questionId) {
			// it = obj;
			this.splice(this.indexOf(it), 1, obj);
			console.log("replaced obj");
			return;
		}
	}
	this.push(obj);
	console.log("pushed obj");
};

const dummyQuestion = {
	questionId: "_1",
	question: "",
	choices: [],
	correctAnswer: -1,
};

const reducer = (state, action) => {
	let { title: localTitle = "", questions: localQuestions = [] } = state;

	switch (action.type) {
		case "titleChange":
			console.log("title change");
			localTitle = action.payload.event.target.value;
			return { title: localTitle, questions: localQuestions };

		case "addQuestion":
			// let  = localQuestions.length + 1;
			console.log("addQuestion");
			const {
				questionId = action.payload.id,
				question = "",
				choices = [],
				correctAnswer = -1,
			} = action.payload;
			localQuestions.addQuestionObj({
				questionId,
				question,
				choices,
				correctAnswer,
			});
			return { title: localTitle, questions: localQuestions };

		case "deleteQuestion":
			localQuestions = localQuestions.filter(
				(question) => question.questionId !== action.payload.id
			);
			return { title: localTitle, questions: localQuestions };

		case "submit":
			console.log("submitted");
			if (localTitle === "") {
				alert("Please add title");
				return { title: localTitle, questions: localQuestions };
			}
			const { id: localId = Date.now(), user, responses } = action.payload;
			let newQuiz = {
				quizid: parseInt(localId),
				creatorId: user.sub,
				title: localTitle,
				questions: localQuestions,
				responses,
			};
			fetch("http://localhost:3010/api/create-quiz", {
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${action.payload.token}`,
				},
				body: JSON.stringify(newQuiz),
				method: ["POST"],
			})
				.then((resp) => {
					if (resp.status == "ok") {
						console.log("Created or edited quiz successfully", resp);
					}
				})
				.catch((e) => {
					console.log("Error in creating new quiz", e);
				});
			action.payload.history.push("/dashboard");
			return { title: localTitle, questions: localQuestions };

		default:
			console.log("nothing was asked from the reducer");
			return { title: localTitle, questions: localQuestions };
	}
};

function CreateQuiz() {
	// let initialState = [];
	// let initialtitle = "";
	let { id } = useParams();

	const { quizes } = useContext(QuizContext);

	let quizResponses = [];
	const init = () => {
		if (id === undefined) {
			id = Date.now();
			return {
				title: "",
				questions: [dummyQuestion],
			};
		}
		console.log("from init func: ", quizes);
		const editable = quizes.filter(
			(quiz) => parseInt(quiz.quizid) === parseInt(id)
		);
		console.log("editable", editable);
		quizResponses = editable.responses;
		console.log("editable.title", editable[0].title);
		console.log("editable.questions", editable[0].questions);
		return { title: editable[0].title, questions: editable[0].questions };
	};

	const initialState = init();

	const [quizState, dispatch] = useReducer(reducer, initialState);

	const history = useHistory();
	const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

	const sendResponses = async (obj) => {
		if (isAuthenticated) {
			let token = await getAccessTokenSilently({
				scope: "read:demo",
			});
			dispatch({
				type: "submit",
				payload: { token, user, history, responses: quizResponses, id },
			});
		}
	};

	return (
		<div>
			<input
				className='quiz-title'
				type='text'
				placeholder='Title'
				value={quizState.title}
				onChange={(e) => {
					dispatch({ type: "titleChange", payload: { event: e } });
				}}
			/>
			{quizState.questions.map((question, index) => {
				return (
					<div key={index} className='question-container'>
						<AddQuestion
							addQuestion={dispatch}
							quizQuestion={question}
							questionId={`_${index + 1}`}
						/>
					</div>
				);
			})}
			<button
				title='Adds an empty question'
				onClick={(e) => {
					dispatch({
						type: "addQuestion",
						payload: { id: `_${quizState.questions.length + 1}` },
					});
				}}
			>
				+
			</button>
			<button
				onClick={sendResponses}
				title='Create Quiz with given title and questions'
			>
				Submit
			</button>
		</div>
	);
}

export default CreateQuiz;
