import React from "react";

import Node from "./node";

const Grid = (props) => {
	const grid = [0, 1, 2, 3, 4, 5];
	const row = [0, 1, 2, 3, 4];

	return (
		<div className="d-flex flex-column">
			{grid.map((rowNum) => (
                <div key={rowNum} id={rowNum} className="d-flex justify-content-center">
					{row.map((colNum) => (
						<Node key={rowNum * 10 + colNum} id={rowNum * 10 + colNum} userGrid={props.userGrid} />
					))}
				</div>
			))}
		</div>
	);
};

export default Grid;
