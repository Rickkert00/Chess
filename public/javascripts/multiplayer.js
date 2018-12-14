var isWhite = false;
var turn = false;
var WTurn = true;
var socket = new WebSocket("ws://192.168.0.149:3001");
var gameid = null;

var winner = null;

var gameover = function () {
    alert("Game Has Ended \nCongratulations to:" + winner);
    window.location.href = "splash.html";
}

//Start of CheckMate Procedures
var callCheckMate = function () {
    $("#CheckMate").click(function (event) {
        alert("Waiting For Opponent To Accept CheckMate...");
        if (winRequest()) {
            if (true) {
                winner = "Black";
            }
            else {
                winner = "White";
            }
        }
        else {
            alert("Enemy Has Rejected Your CheckMate");
        }
    })
}

var callCheck = function (iswhite) {

    $("#Check").click(function (event) {
        alert("Opponent Has Called Check!");
    })

}

//Helper function for Checkmate and GameOver
var winRequest = function () {
    if (confirm("Your Opponent Has Called CheckMate Do You Accept?")) {
        return true;
    }
    else {
        return false;
    }
}

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
    if (JSON.parse(event.data).gameState === "Whites Turn") {
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        board = JSON.parse(event.data).data;
        initialplacement();
        if ((JSON.parse(event.data).sWTurn === true) && (isWhite === true)) {
            turn = true;
            WTurn = true;
        }
        if ((JSON.parse(event.data).sWTurn === false) && (isWhite === false)) {
            turn = true;
            WTurn = false;
        }
    }
    if (JSON.parse(event.data).gameState === "Blacks Turn") {
        board = JSON.parse(event.data).data;
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        initialplacement();
        if ((JSON.parse(event.data).sWTurn === true) && (isWhite === true)) {
            turn = true;
            WTurn = true;
        }
        if ((JSON.parse(event.data).sWTurn === false) && (isWhite === false)) {
            turn = true;
            WTurn = false;
        }
    }
}


//Main Method 3
callCheckMate();
callCheck();