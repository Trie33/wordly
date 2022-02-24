const express = require("express");
const app = express();
const path = require('path');
const server = require('http').createServer(app);
var io = require("socket.io")(server);

const port = process.env.PORT || 4000

// Routing 
app.use(express.static(path.join(__dirname, 'public')));

var gameCollection = new function() {
    this.totalGameCount = 0;
    this.gameList = {};
}

// Gameroom

let numUsers = 0;

io.on('connection', (socket) => {
    let addedUser = false;

    socket.on('new message', (data) => {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message:data
        })
    })

    socket.on('add user', (username) => {
        if (addedUser) {
            return;
        }

        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        })

        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        })
    })

    socket.on('disconnect', function() {
        if (addedUser) {
            --numUsers;
        }

        socket.broadcast.emit('user left', {
            username: socket.username,
            numUsers: numUsers
        })
    })

    socket.on('makeGame', function() {
        let gameId = (Math.random() + 1).toString(36).slice(2, 18);
        console.log("Game created by " + socket.username + " w/ " + gameId);
        gameCollection.gameList.gameId = gameId;
        gameCollection.gameList.gameId.playerOne = socket.username;
        gameCollection.gameList.gameId.open = true;
        gameCollection.totalGameCount++;

        io.emit('gameCreated', {
            username: socket.username,
            gameId: gameId
        })
    })

})

//Joining a game
function joinGame(username, game) {

    if (game.player2 != null) {
        game.player2 = username;
    } else {
        alert("Game " + game.id + " AlreadyHas Max Players")
    }
}

