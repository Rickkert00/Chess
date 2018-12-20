var isWhite = false;
var turn = false;
var WTurn = true;
var socket = new WebSocket("ws://localhost:3001");
var gameid = null;
var winner = null;
var isCheck = false;
var isCheckMate = false;
var isGameOver = false;
var state;

var gameover = function () {
    alert("Game Has Ended \nCongratulations to: " + winner);
    isGameOver = true;
    clientdata = { board: board, id: gameid, WTurn: WTurn, calledCheck: isCheck, calledCheckMate: isCheckMate, gameOver: isGameOver, winner: winner, isWhite: isWhite, ContinueState: state };
    socket.send(JSON.stringify(clientdata));
    window.location.href = "splash.html";
}

//Start of CheckMate Procedures
var callCheckMate = function () {
    $("#CheckMate").click(function (event) {
        alert("Waiting For Opponent To Accept CheckMate...");
        isCheckMate = true;
        clientdata = { board: board, id: gameid, WTurn: WTurn, calledCheck: isCheck, calledCheckMate: isCheckMate, gameOver: isGameOver, winner: winner, isWhite: isWhite, ContinueState: state };
        socket.send(JSON.stringify(clientdata));
    })
}

var callCheck = function (iswhite) {

    $("#Check").click(function (event) {
        isCheck = true;
        clientdata = { board: board, id: gameid, WTurn: WTurn, calledCheck: isCheck, calledCheckMate: isCheckMate, gameOver: isGameOver, winner: winner, isWhite: isWhite, ContinueState: state };
        socket.send(JSON.stringify(clientdata));
        isCheck = false;
    
    })

}

//Helper function for Checkmate and GameOver
var winRequest = function () {
    alert("Wake Up!");
    var accept = confirm("Your Opponent Has Called CheckMate Do You Accept?");
    return accept;
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
        state = "WAITING FOR PLAYERS";
    }
    if (JSON.parse(event.data).gameState === "GAME IS LIVE") {
        alert("GAME IS LIVE");
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        gameid = JSON.parse(event.data).id;
        state = "Blacks Turn";
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
        state = "Blacks Turn";
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
        state = "Whites Turn";
    }
    if (JSON.parse(event.data).gameState === "calledCheckMate") {
        console.log("HI");
        let accept = winRequest();
        if (accept) {
            if (isWhite) {
                winner = "White";
            }
            else {
                winner = "Black";
            }
            gameover();
        }
        else {
            clientdata = { board: board, id: gameid, WTurn: WTurn, calledCheck: isCheck, calledCheckMate: isCheckMate, gameOver: isGameOver, winner: winner, isWhite: isWhite, ContinueState: state };
            socket.send(JSON.stringify(clientdata));
        }
    }
    if (JSON.parse(event.data).gameState === "deniedCheckMate") {
        isCheckMate = false;
        alert("Enemy Has Rejected Your CheckMate");
        clientdata = { board: board, id: gameid, WTurn: WTurn, calledCheck: isCheck, calledCheckMate: isCheckMate, gameOver: isGameOver, winner: winner, isWhite: isWhite, ContinueState: state};
        socket.send(JSON.stringify(clientdata));
    }
    if (JSON.parse(event.data).gameState === "Game Ended") {
        alert("Game Has Ended \nCongratulations to: " + JSON.parse(event.data).swinner);
        window.location.href = "splash.html";
    }
     if (JSON.parse(event.data).gameState === "calledCheck") {
        alert("Opponent Has Called Check!");
        socket.send(JSON.stringify(clientdata));
    }
}

//Main Method 3
callCheckMate();
callCheck();