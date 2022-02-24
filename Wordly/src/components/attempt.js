import React, { useState, useContext } from "react";

import ContextObject from "../context/ContextObject";

const Attempt = () => {
	const [state, setState] = useState("");
	const ctx = useContext(ContextObject);

	const handleChange = (e) => {
		let value = e.target.value;
		value = value.replace(/[^A-Za-z]/gi, "");
		setState(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		ctx.userAttempt(state);
		setState("");
	};

	const resetGame = () => {
		ctx.getWord();
	};

	return (
		<form onSubmit={handleSubmit}>
			{!ctx.gameOver && (
				<>
					<h3>Input Below</h3>
					<input
						type="text"
						onChange={handleChange}
						value={state}
						minLength={5}
						maxLength={5}
					/>
				</>
			)}
			<br></br>
			{ctx.gameOver && (
				<button type="button" onClick={resetGame}>
					Play Again?
				</button>
			)}
		</form>
	);
};

export default Attempt;
