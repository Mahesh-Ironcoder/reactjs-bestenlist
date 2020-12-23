import React from "react";
import Quizes from "./Quizes";
import { Link } from "react-router-dom";

function Admin(props) {
	return (
		<div>
			Welcome admin here you can see all your quizes
			<Link to="/create-quiz" className='add-quiz-btn'>
				+
			</Link>
			<Quizes quizes={props.quizes} />
		</div>
	);
}

export default Admin;
