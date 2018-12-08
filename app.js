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
const wss = new websocket.Server({server});
var gameid = 0;
var clientid = 0;

//generate routes
app.get("/", function(req, res) {
    res.sendFile("splash.html", {root: "./public"});
});

var websockets = [];//property: websocket, value: game


wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        if (websockets[JSON.parse(message).id].gameState === "GAME IS LIVE") {
          
        websockets[JSON.parse(message).id].gameState = "WHITE MOVED";
        websockets[JSON.parse(message).id].data = JSON.parse(message).board;
        websockets[JSON.parse(message).id].websocket1.send(JSON.stringify(websockets[JSON.parse(message).id]));
        websockets[JSON.parse(message).id].websocket2.send(JSON.stringify(websockets[JSON.parse(message).id]));
        }
        else if (websockets[JSON.parse(message).id].gameState === "WHITE MOVED") {
            websockets[JSON.parse(message).id].gameState = "BLACK MOVED";
            websockets[JSON.parse(message).id].data = JSON.parse(message).board;
            websockets[JSON.parse(message).id].websocket1.send(JSON.stringify(websockets[JSON.parse(message).id]));
            websockets[JSON.parse(message).id].websocket2.send(JSON.stringify(websockets[JSON.parse(message).id]));
        }
      });
    
    if (clientid % 2 == 0) {
    websockets.push({websocket1: ws, websocket2: null, playerWhite: clientid, playerBlack: null, id: gameid, gameState: "WAITING FOR PLAYERS", data: null});
    gameid++;
    clientid++;
    websockets[clientid-1].websocket1.send(JSON.stringify(websockets[clientid-1]));
    }
    else {
        websockets[clientid-1].playerBlack = clientid;
        websockets[clientid-1].websocket2 = ws;
        websockets[clientid-1].gameState = "GAME IS LIVE";
        websockets[clientid-1].websocket1.send(JSON.stringify(websockets[clientid-1]));
        websockets[clientid-1].websocket2.send(JSON.stringify(websockets[clientid-1]));
        clientid++;
        gameid++;
    }
    
});

