import React, { useEffect, useContext } from "react";
import ContextObject from "../context/ContextObject";

// Components
import Attempt from "../components/attempt";
import Grid from "../components/grid";
import Timer from "../components/timer";

const Single = () => {
	const ctx = useContext(ContextObject);

	useEffect(() => {
		ctx.getWord();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (ctx.win) {
			alert('You have completed the challenge!');
		} else {
			if (ctx.attempt >= 6) {
				alert(`Sorry! The word was ${ctx.givenWord}`);
			}
		}
	}, [ctx]);

	function disappear() {
		if (document.getElementById("rectangle1") === null) {
			return;
		}
		document.getElementById("rectangle1").style.display = "none"
		document.getElementById("rectangle2").style.display = "none"
	}
	disappear();
	return (
		<div className="App">
			<h2>Single Player</h2>
			<Timer />
			<Grid userGrid={true} />
			<br></br>
			<Attempt />
		</div>
	);
};

export default Single;
