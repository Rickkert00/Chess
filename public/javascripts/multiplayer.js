var isWhite = false;
var turn = false;
var Wturn= true;
var socket = new WebSocket("ws://145.94.191.4:3001");
var gameid = null;
socket.onmessage = function (event) {
    processMove(event);
}

var processMove = function (event) {
    if (JSON.parse(event.data).gameState === "WAITING FOR PLAYERS") {
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        gameid = JSON.parse(event.data).id;
        isWhite = true;
        turn = true;
    }
    if (JSON.parse(event.data).gameState === "GAME IS LIVE") {
        alert("GAME IS LIVE");
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        gameid = JSON.parse(event.data).id;
    }
    if (JSON.parse(event.data).gameState === "BLACK MOVED") {
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        board = JSON.parse(event.data).data;
        initialplacement();
        if ((JSON.parse(event.data).sWTurn === true) && (isWhite === true)) {
            turn = true;
            WTurn = true;
        }
        if ((JSON.parse(event.data).sWTurn === false) && (isWhite == false)) {
            turn = true;
            Wturn = false;
        }
    }
    if (JSON.parse(event.data).gameState === "WHITE MOVED") {
        board = JSON.parse(event.data).data;
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        initialplacement();
        if ((JSON.parse(event.data).sWTurn === true) && (isWhite === true)) {
            turn = true;
            WTrun = true;
        }
        if ((JSON.parse(event.data).sWTurn === false) && (isWhite == false)) {
            turn = true;
            Wturn = false;
        }
    }
}
