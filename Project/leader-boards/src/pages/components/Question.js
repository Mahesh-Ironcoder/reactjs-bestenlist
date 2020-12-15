import React from "react";

function Question(props) {
	/*Handles the submit action*/
	const handleSubmit = (e) => {
		e.preventDefault();
		var ans = document.getElementsByName("ans" + props.qid);
		for (let i = 0; i < ans.length; i++) {
			if (ans[i].checked) {
				props.onAnswered(props.qid, ans[i].value);
			}
		}
	};

	return (
		<div className='qstn-wrapper'>
			<section className='qstn'>{props.question}</section>
			<form>
				{props.choices.map((ch, id) => {
					return (
						<section className='choice' key={id}>
							<input
								type='radio'
								name={"ans" + props.qid}
								value={ch}
								id={props.qid + "" + id}
								onSelect={(e) => {
									console.log("option seelected");
									console.log(e.target.id);
								}}
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
