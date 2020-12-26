import React, { useContext, useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import AddQuestion from "./AddQuestion";
// import quizes from "./quizes";

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
			// localQuestions.push({
			// 	questionId: `_${localQuestions.length + 1}`,
			// 	question: "",
			// 	choices: [],
			// 	correctAnswer: -1,
			// });
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
			let newQuiz = {
				quizid: Date.now(),
				creatorId: action.payload.user.sub,
				title: localTitle,
				questions: localQuestions,
				responses: action.payload.responses,
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
	useEffect(() => {
		console.log("Quiz id: ", id);
		console.log("quizes: ", quizes);
	}, [id]);
	let quizResponses = [];
	const init = () => {
		if (id === undefined) {
			id = Date.now();
			return {
				title: "",
				questions: [dummyQuestion],
			};
		}
		const editable = quizes.filter((quiz) => quiz.quizid === parseInt(id));
		quizResponses = editable.responses;
		return { title: editable.title, questions: editable.questions };
	};
	const [state, dispatch] = useReducer(
		reducer,
		{ title: "", questions: [] },
		init
	);
	const history = useHistory();

	const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

	const sendResponses = async (obj) => {
		if (isAuthenticated) {
			let token = await getAccessTokenSilently({
				scope: "read:demo",
			});
			// try {
			// 	var resp = await fetch("http://localhost:3010/api/create-quiz", {
			// 		headers: {
			// 			"content-type": "application/json",
			// 			Authorization: `Bearer ${token}`,
			// 		},
			// 		body: JSON.stringify(obj),
			// 		method: ["POST"],
			// 	});
			// 	let respData = await resp.json();
			// 	console.log("Create quiz response: ", respData);
			// } catch (e) {
			// 	console.log("error from create quiz api: ", e);
			// }
			dispatch({
				type: "submit",
				payload: { token, user, history, responses: quizResponses },
			});
		}
	};
	console.log(state.questions);

	console.log("Quiz id: ", id);

	return (
		<div>
			<input
				type='text'
				value={state.title}
				onChange={(e) => {
					dispatch({ type: "titleChange", payload: { event: e } });
				}}
			/>
			{state.questions.map((question, index) => {
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
				onClick={(e) => {
					dispatch({
						type: "addQuestion",
						payload: { id: `_${state.questions.length + 1}` },
					});
				}}
			>
				+
			</button>
			<button onClick={sendResponses}>Submit</button>
		</div>
	);
}

export default CreateQuiz;
