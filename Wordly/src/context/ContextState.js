import React, { useEffect, useReducer } from "react";
import { socket } from "./Socket";

import ContextObject from "./ContextObject";
import ContextReducer from "./ContextReducer";

import { getRandomWord } from '../util/words';

import {
	WORD_FETCHED,
	ATTEMPT_MADE,
	TIME_ENDED,
	OPPONENT_ATTEMPT,
	ROOM_CREATED,
	ROOM_JOINED,
	GAME_ENDED,
} from "./types";

const initialState = {
	givenWord: "",
	attempt: 0,
	opponentAttempt: 0,
	gridState: [],
	gridAttempt: [],
	opponentState: [],
	win: false,
	oppWin: false,
	players: 0,
	room: null,
	playerId: null,
	gameOver: false
};

const ContextState = (props) => {
	const [state, dispatch] = useReducer(ContextReducer, initialState);

	useEffect(() => {
		socket.on("moveMade", (obj) => {
			dispatch({
				type: OPPONENT_ATTEMPT,
				input: obj.input,
				givenWord: obj.givenWord,
				id: obj.id
			});
		});

		socket.on("roomJoined", (obj) => {
			if (!state.playerId) {
				dispatch({
					type: ROOM_JOINED,
					room: obj.room,
					players: obj.players,
					id: obj.id,
				});
			}
		});
	}, []);

	const getWord = async () => {
		const word = getRandomWord();

		dispatch({
			type: WORD_FETCHED,
			payload: word,
		});
	};

	const createRoom = async (room) => {
		await socket.emit("createRoom", room);

		await socket.on("roomCreated", (obj) => {
			dispatch({
				type: ROOM_CREATED,
				room: obj.room,
				players: obj.players,
				id: obj.id,
			});
		});

		await socket.on("roomExists", (msg) => {
			alert(msg);
		});
	};

	const joinRoom = async (room) => {
		await socket.emit("joinRoom", {
			room: room,
			givenWord: state.givenWord
		});
	};

	const userAttempt = async (input) => {
		await socket.emit("move", { input, givenWord: state.givenWord });
		dispatch({
			type: ATTEMPT_MADE,
			payload: input,
		});
	};

	const endTimer = () => {
		dispatch({
			type: TIME_ENDED,
		});
	};

	const endGame = () => {
		dispatch({
			type: GAME_ENDED
		})
	}

	return (
		<ContextObject.Provider
			value={{
				...state,
				getWord,
				userAttempt,
				endTimer,
				createRoom,
				joinRoom,
				endGame
			}}
		>
			{props.children}
		</ContextObject.Provider>
	);
};

export default ContextState;
