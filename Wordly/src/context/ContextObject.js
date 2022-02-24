import React from "react";

const initialState = {
    givenWord: '',
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
}

const ContextObject = React.createContext({
    ...initialState,
    getWord: () => {},
    userAttempt: (input) => {},
    endTimer: () => {},
    createRoom: (room) => {},
    joinRoom: (room) => {},
    endGame: () => {}
});

export default ContextObject;