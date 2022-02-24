import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import ContextObject from "../context/ContextObject";

const Rooms = () => {
	const ctx = useContext(ContextObject);
	const [room, setRoom] = useState("");
    const navigate = useNavigate();

	function disappear() {
		if (document.getElementById("rectangle1") === null) {
			return;
		}
		document.getElementById("rectangle1").style.display = "none";
		document.getElementById("rectangle2").style.display = "none";
	}

	disappear();

	useEffect(() => {
		if (ctx.players === 2) {
			navigate('/multi');
		}
	}, [ctx.players, navigate]);

	const handleChange = (e) => {
		setRoom(e.target.value);
	};

	const handleCreate = () => {
        try {
			ctx.createRoom(room);
			alert('room created');
		} catch (err) {
			alert(err.message);
		}
    };

	const handleJoin = () => {
        ctx.joinRoom(room);
        navigate('/multi');
    };

	return (
		<div className="d-flex flex-row">
			<div className="d-flex flex-column">
				<input type="text" onChange={handleChange} />
				<button onClick={handleCreate}>Create Room</button>
			</div>
			<div className="d-flex flex-column">
				<input type="text" onChange={handleChange} />
				<button onClick={handleJoin}>Join Room</button>
			</div>
		</div>
	);
};

export default Rooms;
