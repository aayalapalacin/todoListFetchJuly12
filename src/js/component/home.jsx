import React from "react";
import { UserInput } from "./UserInput";

//include images into your bundle

//create your first component
const Home = () => {
	return (
		<div className="container">
			<div className="Title">Todo's</div>
			<div className="inputContainer">
				<div className="inputField">
					<UserInput />
				</div>
			</div>
		</div>
	);
};

export default Home;