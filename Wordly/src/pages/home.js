import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

	function appear() {
		if (document.getElementById("rectangle1") === null) {
			return;
		}
		document.getElementById("rectangle1").style.display = "block"
		document.getElementById("rectangle2").style.display = "block"
	}
	appear();
	return (
		<div className="App">
			<h2>Wordly</h2>
			<h4>Welcome to Wordly</h4>
            <p><small>A word-based game to test your vocabulary.</small></p>
            <p><small>Enter 5 letter words and receive hints.</small></p>
			<p><small>A green background will indicate the letter is in the correct position</small></p>
			<p><small>An orange background will indicate the letter is in the solution but in the incorrect position</small></p>
			<p><small>A grey background will indicate the letter is not in the solution</small></p>
			<div className="d-flex flex-column align-items-center">
				<strong>Now choose between single and multiplayer!</strong>
				<Link className="btn btn-light" to="/single">Single</Link>
				<Link className="btn btn-light" to="/rooms">Multiplayer</Link>
			</div>
		</div>
	);
};

export default Home;
