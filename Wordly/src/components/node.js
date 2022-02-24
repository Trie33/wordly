import React, { useContext } from "react";

import ContextObject from "../context/ContextObject";

const Node = (props) => {
	const ctx = useContext(ContextObject);

	const { gridState, gridAttempt, opponentState } = ctx;

	const currentGrid = props.userGrid ? gridState : opponentState;
	const currentAttempt = props.userGrid ? gridAttempt : null;

	const row = Math.round(props.id / 10);
	const col = props.id % 10;

	return (
		<div id={props.id} key={props.id}>
			{currentGrid && currentGrid[row] && currentGrid[row][col] ? (
				<div className={`node col-${currentGrid[row][col]}`}>
					{currentAttempt && currentAttempt[row] && currentAttempt[row][col]
						? currentAttempt[row][col]
						: ""}
				</div>
			) : (
				<div className="node">
					{currentAttempt && currentAttempt[row] && currentAttempt[row][col]
						? currentAttempt[row][col]
						: ""}
				</div>
			)}
		</div>
	);
};

export default Node;
