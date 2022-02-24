import React, { useContext, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import ContextObject from "../context/ContextObject";

function MyTimer({ expiryTimestamp }) {
	const {
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn("onExpire called"),
	});

	const ctx = useContext(ContextObject);

	useEffect(() => {
		const time = new Date();
		time.setSeconds(time.getSeconds() + 300);
		restart(time);

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (minutes == 0 && seconds == 0) {
			ctx.endTimer();
		}
	});

	return (
		<div style={{ textAlign: "center" }}>
			<div style={{ fontSize: "50px" }}>
				<span>0{minutes}</span>:
				<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
			</div>
			{/* <button onClick={start}>Start</button>
			<button onClick={pause}>Pause</button>
			<button onClick={resume}>Resume</button> */}
			{/* <button
				onClick={() => {
					// Restarts to 5 minutes timer
					const time = new Date();
					time.setSeconds(time.getSeconds() + 300);
					restart(time);
				}}
			>
				Restart
			</button> */}
		</div>
	);
}

const Timer = () => {
	const ctx = useContext(ContextObject);
	const time = new Date();
	time.setSeconds(time.getSeconds() + 300);

	return (
		<div>
			{ctx.win ? null : ctx.attempt < 6 && <MyTimer expiryTimestamp={time} />}
		</div>
	);
};

export default Timer;
