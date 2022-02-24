import {
	WORD_FETCHED,
	ATTEMPT_MADE,
	TIME_ENDED,
	OPPONENT_ATTEMPT,
	ROOM_CREATED,
	ROOM_JOINED,
	GAME_ENDED,
} from "./types";

const ContextReducer = (state, action) => {
	switch (action.type) {
		case WORD_FETCHED:
			const temp = [];
			const opp = [];
			const temp2 = [];

			for (let i = 1; i <= 6; i++) {
				let newList = ["white", "white", "white", "white", "white"];
				temp.push(newList);
				opp.push(newList);

				let vals = ["", "", "", "", ""];
				temp2.push(vals);
			}

			return {
				...state,
				givenWord: action.payload,
				gridState: temp,
				gridAttempt: temp2,
				opponentState: opp,
				attempt: 0,
				opponentAttempt: 0,
				win: false,
				gameOver: false
			};

		case ATTEMPT_MADE:
			let t1 = state.gridState[state.attempt];

			const tempState = [...t1];

			const curState = [];
			state.gridState.forEach((obj) => {
				curState.push(obj);
			});

			let result = true;

			let t2 = state.gridAttempt[state.attempt];
			const attemptState = [...t2];

			const curAttempt = [];
			state.gridAttempt.forEach((obj) => {
				curAttempt.push(obj);
			});

			const guess = action.payload;
			const solution = state.givenWord;

			for (let i = 0; i < guess.length; i++) {
				attemptState[i] = guess[i];
				let guessedLetter = guess.charAt(i);
				let solutionLetter = solution.charAt(i);
				if (guessedLetter === solutionLetter) {
					tempState[i] = "green";
				} else if (solution.indexOf(guessedLetter) !== -1) {
					result = false;
					tempState[i] = "yellow";
				} else {
					tempState[i] = "grey";
					result = false;
				}
			}

			curAttempt[state.attempt] = attemptState;
			curState[state.attempt] = tempState;

			let gameState = false;
			if (result) {
				gameState = true;
			}

			if (state.attempt >= 5) {
				gameState = true;
			}

			return {
				...state,
				attempt: state.attempt + 1,
				gridState: curState,
				gridAttempt: curAttempt,
				win: result,
				gameOver: gameState
			};
		case OPPONENT_ATTEMPT:
			if (action.id === state.playerId) {
				return state;
			}

			let t3 = state.opponentState[state.opponentAttempt];
			const tempOppState = [...t3];

			const curOppState = [];
			state.opponentState.forEach((obj) => {
				curOppState.push(obj);
			});

			let res = true;
			const sol = action.givenWord;

			const oppGuess = action.input;

			for (let i = 0; i < oppGuess.length; i++) {
				let guessedLetter = oppGuess.charAt(i);
				let solLetter = sol.charAt(i);
				if (guessedLetter === solLetter) {
					tempOppState[i] = "green";
				} else if (sol.indexOf(guessedLetter) !== -1) {
					res = false;
					tempOppState[i] = "yellow";
				} else {
					tempOppState[i] = "grey";
					res = false;
				}
			}

			curOppState[state.opponentAttempt] = tempOppState;

			let newGameState = false;
			if (res) {
				newGameState = true;
			}

			if (state.opponentAttempt >= 5) {
				newGameState = true;
			}

			return {
				...state,
				opponentState: curOppState,
				opponentAttempt: state.opponentAttempt + 1,
				oppWin: res,
				gameState: newGameState
			};
		case TIME_ENDED:
			return {
				...state,
				win: false,
				attempt: 7,
			};
		case ROOM_CREATED:
			return {
				...state,
				room: action.room,
				players: action.players,
				playerId: action.id
			}
		case ROOM_JOINED:
			let plId = null;
			if (state.playerId === null) {
				plId = action.id;
			} else {
				plId = state.playerId;
			}

			return {
				...state,
				room: action.room,
				players: action.players,
				playerId: plId
			}
		case GAME_ENDED:
			return {
				...state,
				players: 0,
				room: null,
				win: false,
				oppWin: false,
			}
		default:
			return state;
	}
};

export default ContextReducer;
