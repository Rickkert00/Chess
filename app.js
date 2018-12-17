var express = require("express");
var http = require("http");
var websocket = require("ws");
var messages = require("./public/javascripts/messages");
var gameStatus = require("./gamestatus");
//var game = require('./game');
var port = process.argv[2];
var app = express();



app.use(express.static(__dirname + "/public"));
var server = http.createServer(app).listen(port);
const wss = new websocket.Server({ server });
var gameid = 0;
var clientid = 0;

//generate routes
app.get("/", function (req, res) {
    res.sendFile("splash.html", { root: "./public" });
});

var websockets = [];


wss.on('connection', function (ws) {
    //checks whether a client has made a move
    ws.on('message', function (message) {
         if (JSON.parse(message).calledCheckMate === true) {
            websockets[JSON.parse(message).id].gameState = "calledCheckMate";
            websockets[JSON.parse(message).id].scalledCheckMate = true;
            if (JSON.parse(message).isWhite === false) {
                websockets[JSON.parse(message).id].websocket1.send(JSON.stringify(websockets[JSON.parse(message).id]));
            }
            else if (JSON.parse(message).isWhite === true) {
                console.log("rick rocks");
                websockets[JSON.parse(message).id].websocket2.send(JSON.stringify(websockets[JSON.parse(message).id]));
            }
        }
        else if (JSON.parse(message).gameOver === true) {
            websockets[JSON.parse(message).id].gameState = "Game Ended";
            websockets[JSON.parse(message).id].swinner = JSON.parse(message).winner;
            if (JSON.parse(message).isWhite === false) {
                websockets[JSON.parse(message).id].websocket1.send(JSON.stringify(websockets[JSON.parse(message).id]));
            }
            else if (JSON.parse(message).isWhite === true) {
                websockets[JSON.parse(message).id].websocket2.send(JSON.stringify(websockets[JSON.parse(message).id]));
            }
        }
         else if ((JSON.parse(message).calledCheckMate === false) && (websockets[JSON.parse(message).id].scalledCheckMate === true)) {
            websockets[JSON.parse(message).id].gameState = "deniedCheckMate";
            websockets[JSON.parse(message).id].scalledCheckMate = false;
            if (JSON.parse(message).isWhite === false) {
                console.log("test");
                websockets[JSON.parse(message).id].websocket1.send(JSON.stringify(websockets[JSON.parse(message).id]));
            }
            else if (JSON.parse(message).isWhite === true) {
                console.log("test2");
                websockets[JSON.parse(message).id].websocket2.send(JSON.stringify(websockets[JSON.parse(message).id]));
            }
            websockets[JSON.parse(message).id].gameState = JSON.parse(message).ContinueState;
        }
       else if (websockets[JSON.parse(message).id].gameState === "GAME IS LIVE") {
            //if white made a move then pass it along to other client
            websockets[JSON.parse(message).id].gameState = "Blacks Turn";
            websockets[JSON.parse(message).id].data = JSON.parse(message).board;
            websockets[JSON.parse(message).id].sWTurn = JSON.parse(message).WTurn;
            websockets[JSON.parse(message).id].websocket1.send(JSON.stringify(websockets[JSON.parse(message).id]));
            websockets[JSON.parse(message).id].websocket2.send(JSON.stringify(websockets[JSON.parse(message).id]));
        }
        //if black made a move then pass it along to other client
        else if (websockets[JSON.parse(message).id].gameState === "Blacks Turn") {
            websockets[JSON.parse(message).id].gameState = "Whites Turn";
            websockets[JSON.parse(message).id].data = JSON.parse(message).board;
            websockets[JSON.parse(message).id].sWTurn = JSON.parse(message).WTurn;
            websockets[JSON.parse(message).id].websocket1.send(JSON.stringify(websockets[JSON.parse(message).id]));
            websockets[JSON.parse(message).id].websocket2.send(JSON.stringify(websockets[JSON.parse(message).id]));
        }
        else if (websockets[JSON.parse(message).id].gameState === "Whites Turn") {
            websockets[JSON.parse(message).id].gameState = "Blacks Turn";
            websockets[JSON.parse(message).id].data = JSON.parse(message).board;
            websockets[JSON.parse(message).id].sWTurn = JSON.parse(message).WTurn;
            websockets[JSON.parse(message).id].websocket1.send(JSON.stringify(websockets[JSON.parse(message).id]));
            websockets[JSON.parse(message).id].websocket2.send(JSON.stringify(websockets[JSON.parse(message).id]));
        }
    });

    if (clientid % 2 === 0) {
        //generates a new game and sets the gamestate to waiting for players
        websockets.push({ websocket1: ws, websocket2: null, playerWhite: clientid, playerBlack: null, id: gameid, gameState: "WAITING FOR PLAYERS", data: null, sWTurn: true, scalledCheckMate: false, scalledCheck: true, swinner: null});
        websockets[gameid].websocket1.send(JSON.stringify(websockets[gameid]));
        gameid++;
        clientid++;

    }
    else {
        //pairs the 2nd player with the first so they are in the same game
        websockets[gameid - 1].playerBlack = clientid;
        websockets[gameid - 1].websocket2 = ws;
        websockets[gameid - 1].gameState = "GAME IS LIVE";
        websockets[gameid - 1].websocket1.send(JSON.stringify(websockets[gameid - 1]));
        websockets[gameid - 1].websocket2.send(JSON.stringify(websockets[gameid - 1]));
        clientid++;
    }

});

