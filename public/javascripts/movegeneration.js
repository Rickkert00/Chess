var clicked = false;
var turn = false;
var socket = new WebSocket("ws://localhost:3000");
var gameid = null;
socket.onmessage = function(event) {
    processMove(event);
}

var processMove = function(event) {
    if (JSON.parse(event.data).gameState === "WAITING FOR PLAYERS") {
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        turn = true;
        gameid = JSON.parse(event.data).id;
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
    }
    if (JSON.parse(event.data).gameState === "WHITE MOVED") {
        board = JSON.parse(event.data).data;
        document.getElementById("topmiddle").innerHTML = JSON.parse(event.data).gameState;
        initialplacement();
    }
}
//add white or black turn selection into switch statement
var select = function () {
    $(".square").click(function (event) {
        if (clicked === false) {
            parser = new DOMParser;//needed to parse the unicode to actual images so the comparison in the cases goes right
            switch (document.getElementById(event.target.id).innerHTML) {//get the content of the clicked tile
                case parser.parseFromString(WPawn, 'text/html').body.textContent: MovePawn(event.target.id, true);//this converts the const to an image so the comparison goes right
                    break;
                case parser.parseFromString(BPawn, 'text/html').body.textContent: MovePawn(event.target.id, false);//this converts the const to an image so the comparison goes right
                    break;
                case parser.parseFromString(WRook, 'text/html').body.textContent: MoveRook(event.target.id, true);
                    break;
                case parser.parseFromString(WBishop, 'text/html').body.textContent: MoveBishop(event.target.id, true);
                    break;
                case parser.parseFromString(WKnight, 'text/html').body.textContent: MoveKnight(event.target.id, true);
                    break;
                case parser.parseFromString(WQueen, 'text/html').body.textContent: MoveQueen(event.target.id, true);
                    break;
                case parser.parseFromString(WKing, 'text/html').body.textContent: MoveKing(event.target.id, true);
                    break;
                case parser.parseFromString(BRook, 'text/html').body.textContent: MoveRook(event.target.id, false);
                    break;
                case parser.parseFromString(BBishop, 'text/html').body.textContent: MoveBishop(event.target.id, false);
                    break;
                case parser.parseFromString(BKnight, 'text/html').body.textContent: MoveKnight(event.target.id, false);
                    break;
                case parser.parseFromString(BQueen, 'text/html').body.textContent: MoveQueen(event.target.id, false);
                    break;
                case parser.parseFromString(BKing, 'text/html').body.textContent: MoveKing(event.target.id, false);
                    break;

            }

        }

    }
    );

}
//this function checks whether you clicked on one of the possible moves or not and then moves the pieces accordingly or resets the clicking event
var globalOnClick = function (event, moves, id, onClick, piece) {
    if (clicked) {
        for (let i = 0; i < moves.length; i++) {
            if (event.target.id === moves[i]) {
                if (turn === true) {
                clicked = false;
                board[parseInt(event.target.id.charAt(0))][parseInt(event.target.id.charAt(1))] = piece;

                //Check If White pawn and needs promotion
                if (piece === "&#9817;" && parseInt(event.target.id.charAt(0)) === 7) {
                    board[parseInt(event.target.id.charAt(0))][parseInt(event.target.id.charAt(1))] = promotion(true);
                }
                if (piece === "&#9823;" && parseInt(event.target.id.charAt(0)) === 0) {
                    board[parseInt(event.target.id.charAt(0))][parseInt(event.target.id.charAt(1))] = promotion(false);
                }

                board[parseInt(id.charAt(0))][parseInt(id.charAt(1))] = 0;
                initialplacement();
                for (let j = 0; j < moves.length; j++) {
                    if (parseInt(moves[j].charAt(0)) % 2 === parseInt(moves[j].charAt(1) % 2)) {
                        document.getElementById(moves[j]).style.background = "white";
                    } else {
                        document.getElementById(moves[j]).style.background = "gray";
                    }
                }
                turn = false;
                var clientdata = {board: board, id: gameid};
                socket.send(JSON.stringify(clientdata));
                $(".square").unbind("click", onClick);
                return;
            }
        }

        }
        for (let j = 0; j < moves.length; j++) {
            if (parseInt(moves[j].charAt(0)) % 2 === parseInt(moves[j].charAt(1) % 2)) {
                document.getElementById(moves[j]).style.background = "white";
            } else {
                document.getElementById(moves[j]).style.background = "gray";
            }
            clicked = false;
        }
    }

    $(".square").unbind("click", onClick);
}



//Promotion Method for Pawns:
var promotion = function (isWhite) {
    var choice = prompt("Please Enter The Name Of The Piece You Want\n You can't choose King!\n Start with Capital Eg: Queen", "Pawn");
    if (isWhite) {
        choice = "W" + choice;
    }
    else {
        choice = "B" + choice;
    }
    console.log("The Chosen Piece: " + choice);
    console.log("Unicode: " + window[choice]);
    //Check for Valid input
    if (choice === "WKing" || choice === "BKing" || (!(WPieces.includes(window[choice])) && !(BPieces.includes(window[choice])))) {
        alert("K, You trying to break the game?\n Nice Try....");
        return promotion(isWhite);
    }
    else {
        console.log("Promotion to: " + choice);
        alert("Your Piece is Now A: " + choice + "!");
        return window[choice];
    }
}

//this function computes all possible moves for the white pawn that is currently selected via a click
var MovePawn = function (id, isWhite) {
    let moves = [];
    let pawngen = function (enemyArray) {
        if (isWhite) {
            if (((!(parseInt(id.charAt(1)) - 1 < 0)))) {//this checks whether the left diagonal tile is not out of board range

                if (board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)) - 1)] !== 0) {//this checks whether there is a piece or not on the left diagonal tile from the selected piece
                    //fix white checking
                    if (enemyArray.includes(board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)) - 1)])) {//this checks whether the piece is white or black
                        document.getElementById((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1)) - 1)).style.background = "lightgreen";//sets the tile background to green if the piece is black , it indicates that is is a legal move
                        moves[moves.length] = ((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1)) - 1));
                    }

                }
            }
            if (!(parseInt(id.charAt(1)) + 1 > 7)) {//checks whether the right diagonal tile is not out of board range
                if (board[parseInt(id.charAt(0)) + 1][parseInt(id.charAt(1)) + 1] !== 0) {//checks whether the right diagonal tile is empty or not  

                    if (enemyArray.includes(board[parseInt(id.charAt(0)) + 1][parseInt(id.charAt(1)) + 1])) {//checks whether it is black or white
                        document.getElementById((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1)) + 1)).style.background = "lightgreen";//if black then mark it as a possible move
                        moves[moves.length] = ((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1)) + 1));
                    }
                }
            }

            if (!((parseInt(id.charAt(0)) + 1) > 7)) {//check whether tile straight ahead is out of board range
                if (board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)))] === 0) {//check whether the tile ahead is emtpy or not
                    document.getElementById((parseInt(id.charAt(0)) + 1) + "" + id.charAt(1)).style.background = "lightgreen";//if empty then mark possible move
                    moves[moves.length] = ((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1))));
                    if (parseInt(id.charAt(0)) === 1) {//check whether the pawn is still in the default row to check for double tile move
                        if (board[parseInt(id.charAt(0)) + 2][parseInt((id.charAt(1)))] === 0) {//check whether the tile 2 rows above is empty or not
                            document.getElementById((parseInt(id.charAt(0)) + 2) + "" + id.charAt(1)).style.background = "lightgreen";//if empty then mark possible move
                            moves[moves.length] = ((parseInt(id.charAt(0)) + 2) + "" + (parseInt(id.charAt(1))));
                        }
                    }

                }
            }

        }
        else {
            if (((!(parseInt(id.charAt(1)) - 1 < 0)))) {//this checks whether the left diagonal tile is not out of board range

                if (board[parseInt(id.charAt(0)) - 1][parseInt((id.charAt(1)) - 1)] !== 0) {//this checks whether there is a piece or not on the left diagonal tile from the selected piece
                    //fix white checking
                    if (enemyArray.includes(board[parseInt(id.charAt(0)) - 1][parseInt((id.charAt(1)) - 1)])) {//this checks whether the piece is white or black
                        document.getElementById((parseInt(id.charAt(0)) - 1) + "" + (parseInt(id.charAt(1)) - 1)).style.background = "lightgreen";//sets the tile background to green if the piece is black , it indicates that is is a legal move
                        moves[moves.length] = ((parseInt(id.charAt(0)) - 1) + "" + (parseInt(id.charAt(1)) - 1));
                    }

                }
            }
            if (!(parseInt(id.charAt(1)) + 1 > 7)) {//checks whether the left diagonal tile is not out of board range
                if (board[parseInt(id.charAt(0)) - 1][parseInt(id.charAt(1)) + 1] !== 0) {//checks whether the right diagonal tile is empty or not  

                    if (enemyArray.includes(board[parseInt(id.charAt(0)) - 1][parseInt(id.charAt(1)) + 1])) {//checks whether it is black or white
                        document.getElementById((parseInt(id.charAt(0)) - 1) + "" + (parseInt(id.charAt(1)) + 1)).style.background = "lightgreen";//if black then mark it as a possible move
                        moves[moves.length] = ((parseInt(id.charAt(0)) - 1) + "" + (parseInt(id.charAt(1)) + 1));
                    }
                }
            }

            if (!((parseInt(id.charAt(0)) - 1) > 7)) {//check whether tile straight ahead is out of board range
                if (board[parseInt(id.charAt(0)) - 1][parseInt((id.charAt(1)))] === 0) {//check whether the tile ahead is emtpy or not
                    document.getElementById((parseInt(id.charAt(0)) - 1) + "" + id.charAt(1)).style.background = "lightgreen";//if empty then mark possible move
                    moves[moves.length] = ((parseInt(id.charAt(0)) - 1) + "" + (parseInt(id.charAt(1))));
                    if (parseInt(id.charAt(0)) === 6) {//check whether the pawn is still in the default row to check for double tile move
                        if (board[parseInt(id.charAt(0)) - 2][parseInt((id.charAt(1)))] === 0) {//check whether the tile 2 rows above is empty or not
                            document.getElementById((parseInt(id.charAt(0)) - 2) + "" + id.charAt(1)).style.background = "lightgreen";//if empty then mark possible move
                            moves[moves.length] = ((parseInt(id.charAt(0)) - 2) + "" + (parseInt(id.charAt(1))));
                        }
                    }

                }
            }
        }


    }

    if (isWhite) {
        pawngen(BPieces);
        console.log("White Pawn")
    }
    else {
        pawngen(WPieces);
        console.log("Black Pawn")
    }
    if (moves.length === 0) {
        return;
    }
    else {
        //this handles the clicking on a new square 
        if (isWhite) {
            var onClick = function (event) {
                globalOnClick(event, moves, id, onClick, WPawn);
            }
            $(".square").click(onClick);
            clicked = true;
        }
        else {
            var onClick = function (event) {
                globalOnClick(event, moves, id, onClick, BPawn);
            }
            $(".square").click(onClick);
            clicked = true;
        }
    }
}

var MoveKing = function (id, isWhite) {
    let moves = [];
    let i = -1;
    let j = 1;
    while (i < 2) {

        while (j > -2) {//check whether king is out of board range
            if (((parseInt(id.charAt(0)) + i < 0) || parseInt(id.charAt(0)) + i > 7)) {

            }
            else {
                if (board[parseInt(id.charAt(0)) + i][parseInt(id.charAt(1)) - j] === 0) {//this checks whether there is a piece or not on the left diagonal tile from the selected piece
                    document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - j)).style.background = "lightgreen";//sets the tile background to green if the piece is black , it indicates that is is a legal move
                    moves[moves.length] = ((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - j));
                }
                else {
                    //check whether there is a black or white piece on the tile left diagonal
                    if (isWhite) {
                        if (BPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt(id.charAt(1)) - j])) {//this checks whether the piece is white or black
                            document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - j)).style.background = "lightgreen";//sets the tile background to green if the piece is black , it indicates that is is a legal move
                            moves[moves.length] = ((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - j));
                        }
                    }
                    else {
                        if (WPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt(id.charAt(1)) - j])) {//this checks whether the piece is white or black
                            document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - j)).style.background = "lightgreen";//sets the tile background to green if the piece is black , it indicates that is is a legal move
                            moves[moves.length] = ((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - j));
                        }
                    }
                }
            }
            j--;
        }
        j = 1;
        i++
    }



    if (moves.length === 0) {
        return;
    }
    else {
        if (isWhite) {

            var onClick = function (event) {

                globalOnClick(event, moves, id, onClick, WKing);
            }
            $(".square").click(onClick);
            clicked = true;
        }
        else {
            var onClick = function (event) {
                globalOnClick(event, moves, id, onClick, BKing);
            }
            $(".square").click(onClick);
            clicked = true;
        }
    }
}


var MoveQueen = function (id, isWhite) {
    let moves = [];
    //check for above left diagonal for legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) + i) > 7) && !(((parseInt(id.charAt(1))) - i) < 0)) {//checks whether the top left diagonal is out of range

            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) - i] === 0) {
                document.getElementById((parseInt(id.charAt(0)) + i) + "" + ((parseInt(id.charAt(1))) - i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i);
            }
            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) - i] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }
    //check for left down diagonal possible tiles
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) - i) < 0) && !(((parseInt(id.charAt(1))) - i) < 0)) {//checks whether the tile is out of board range

            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) - i] === 0) {
                document.getElementById((parseInt(id.charAt(0)) - i) + "" + ((parseInt(id.charAt(1))) - i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i);
            }
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) - i] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }
    //check top right diagonal free tiles
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) + i) > 7) && !(((parseInt(id.charAt(1))) + i) > 7)) {//checks whether the top right diagonal tiles are out of board range

            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) + i] === 0) {
                document.getElementById((parseInt(id.charAt(0)) + i) + "" + ((parseInt(id.charAt(1))) + i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i);
            }
            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) + i] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }
    //check bottom right diagonal free tiles
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) - i) < 0) && !(((parseInt(id.charAt(1))) + i) > 7)) {//checks whether the bottom right diagonal tiles are out of board range

            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) + i] === 0) {
                document.getElementById((parseInt(id.charAt(0)) - i) + "" + ((parseInt(id.charAt(1))) + i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i);
            }
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) + i] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }
    //check for tiles above the rook for legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) + i) > 7)) {//checks whether the tile(s) above the rook are out of board range

            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))] === 0) {
                document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
            }
            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }



    //check for tiles below the rook that are legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) - i) < 0)) {//checks whether the tile(s) below the rook are out of board range
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))] === 0) {
                document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)));
            }
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)));
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)));
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }
    }

    //check for tiles to the left of the rook for legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(1))) - i) < 0)) {//checks whether the tile(s) left of the rook are out of board range
            if (board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) - i] === 0) {
                document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i);
            }
            if (board[parseInt(id.charAt(0))][parseInt((id.charAt(1)) - i)] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }
    }

    //check for tiles right of the rook that are legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(1))) + i) > 7)) {//checks whether the tile(s) right of the rook are out of board range
            if (board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) + i] === 0) {
                document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
            }
            if (board[parseInt(id.charAt(0))][parseInt(id.charAt(1)) + i] !== 0) {

                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }
        }
    }

    if (moves.length === 0) {
        return;
    }
    else {
        if (isWhite) {

            var onClick = function (event) {

                globalOnClick(event, moves, id, onClick, WQueen);
            }
            $(".square").click(onClick);
            clicked = true;
        }
        else {
            var onClick = function (event) {
                globalOnClick(event, moves, id, onClick, BQueen);
            }
            $(".square").click(onClick);
            clicked = true;
        }
    }
}



var MoveBishop = function (id, isWhite) {
    let moves = [];
    //check for above left diagonal for legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) + i) > 7) && !(((parseInt(id.charAt(1))) - i) < 0)) {//checks whether the top left diagonal is out of range

            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) - i] === 0) {
                document.getElementById((parseInt(id.charAt(0)) + i) + "" + ((parseInt(id.charAt(1))) - i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i);
            }
            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) - i] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }
    //check for left down diagonal possible tiles
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) - i) < 0) && !(((parseInt(id.charAt(1))) - i) < 0)) {//checks whether the tile is out of board range

            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) - i] === 0) {
                document.getElementById((parseInt(id.charAt(0)) - i) + "" + ((parseInt(id.charAt(1))) - i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i);
            }
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) - i] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }
    //check top right diagonal free tiles
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) + i) > 7) && !(((parseInt(id.charAt(1))) + i) > 7)) {//checks whether the top right diagonal tiles are out of board range

            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) + i] === 0) {
                document.getElementById((parseInt(id.charAt(0)) + i) + "" + ((parseInt(id.charAt(1))) + i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i);
            }
            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) + i] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }
    //check bottom right diagonal free tiles
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) - i) < 0) && !(((parseInt(id.charAt(1))) + i) > 7)) {//checks whether the bottom right diagonal tiles are out of board range

            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) + i] === 0) {
                document.getElementById((parseInt(id.charAt(0)) - i) + "" + ((parseInt(id.charAt(1))) + i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i);
            }
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) + i] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }



    if (moves.length === 0) {
        return;
    }
    else {
        if (isWhite) {

            var onClick = function (event) {

                globalOnClick(event, moves, id, onClick, WBishop);
            }
            $(".square").click(onClick);
            clicked = true;
        }
        else {
            var onClick = function (event) {
                globalOnClick(event, moves, id, onClick, BBishop);
            }
            $(".square").click(onClick);
            clicked = true;
        }
    }
}


var MoveRook = function (id, isWhite) {
    let moves = [];
    //check for tiles above the rook for legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) + i) > 7)) {//checks whether the tile(s) above the rook are out of board range

            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))] === 0) {
                document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
            }
            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }

    }



    //check for tiles below the rook that are legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) - i) < 0)) {//checks whether the tile(s) below the rook are out of board range
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))] === 0) {
                document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)));
            }
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)));
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)));
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }
    }

    //check for tiles to the left of the rook for legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(1))) - i) < 0)) {//checks whether the tile(s) left of the rook are out of board range
            if (board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) - i] === 0) {
                document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i);
            }
            if (board[parseInt(id.charAt(0))][parseInt((id.charAt(1)) - i)] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) - i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) - i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }

        }
    }
    //check for tiles right of the rook that are legal moves
    for (let i = 1; i <= 7; i++) {
        if (!(((parseInt(id.charAt(1))) + i) > 7)) {//checks whether the tile(s) right of the rook are out of board range
            if (board[parseInt(id.charAt(0))][parseInt(id.charAt(1)) + i] === 0) {
                document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
            }
            if (board[parseInt(id.charAt(0))][parseInt(id.charAt(1)) + i] !== 0) {

                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
                        i = 8;
                    }
                    else {
                        i = 8;
                    }
                }
            }
        }
    }

    if (moves.length === 0) {
        return;
    }
    else {
        if (isWhite) {

            var onClick = function (event) {

                globalOnClick(event, moves, id, onClick, WRook);
            }
            $(".square").click(onClick);
            clicked = true;
        }
        else {
            var onClick = function (event) {
                globalOnClick(event, moves, id, onClick, BRook);
            }
            $(".square").click(onClick);
            clicked = true;
        }
    }
}




var MoveKnight = function (id, isWhite) {
    let moves = [];

    //Move Generation
    let knightgen = function (allyArray) {
        for (var i = 0; i <= 2; i += 2) {
            //First If check if move out of bounds
            if (((parseInt(id.charAt(0))) + 2 >= 0) && (parseInt(id.charAt(0))) + 2 <= 7 && ((parseInt(id.charAt(1))) + (-1 + i) >= 0) && ((parseInt(id.charAt(1))) + (-1 + i) <= 7)) {
                //Second check for if square contains an ally
                if (!(allyArray.includes(board[parseInt(id.charAt(0)) + 2][parseInt(id.charAt(1)) + (-1 + i)]))) {
                    document.getElementById((parseInt(id.charAt(0)) + 2) + "" + (parseInt(id.charAt(1)) + (-1 + i))).style.background = "lightgreen";
                    moves[moves.length] = ((parseInt(id.charAt(0)) + 2) + "" + (parseInt(id.charAt(1)) + (-1 + i)));
                }
            }
            if (((parseInt(id.charAt(0))) - 2 >= 0) && (parseInt(id.charAt(0))) - 2 <= 7 && ((parseInt(id.charAt(1))) + (-1 + i) >= 0) && ((parseInt(id.charAt(1))) + (-1 + i) <= 7)) {
                if (!(allyArray.includes(board[parseInt(id.charAt(0)) - 2][parseInt(id.charAt(1)) + (-1 + i)]))) {
                    document.getElementById((parseInt(id.charAt(0)) - 2) + "" + (parseInt(id.charAt(1)) + (-1 + i))).style.background = "lightgreen";
                    moves[moves.length] = ((parseInt(id.charAt(0)) - 2) + "" + (parseInt(id.charAt(1)) + (-1 + i)));
                }
            }
            if (((parseInt(id.charAt(0)) + (-1 + i)) >= 0) && (parseInt(id.charAt(0)) + (-1 + i) <= 7) && (parseInt(id.charAt(1)) + 2 >= 0) && (parseInt(id.charAt(1)) + 2 <= 7)) {
                if (!(allyArray.includes(board[parseInt(id.charAt(0)) + (-1 + i)][parseInt(id.charAt(1)) + 2]))) {
                    document.getElementById((parseInt(id.charAt(0)) + (-1 + i)) + "" + (parseInt(id.charAt(1)) + 2)).style.background = "lightgreen";
                    moves[moves.length] = ((parseInt(id.charAt(0)) + (-1 + i)) + "" + (parseInt(id.charAt(1)) + 2));
                }
            }
            if (((parseInt(id.charAt(0))) + (-1 + i)) >= 0 && (parseInt(id.charAt(0))) + (-1 + i) <= 7 && (parseInt(id.charAt(1))) - 2 >= 0 && (parseInt(id.charAt(1))) - 2 <= 7) {
                if (!(allyArray.includes(board[parseInt(id.charAt(0)) + (-1 + i)][parseInt(id.charAt(1)) - 2]))) {
                    document.getElementById((parseInt(id.charAt(0)) + (-1 + i)) + "" + (parseInt(id.charAt(1)) - 2)).style.background = "lightgreen";
                    moves[moves.length] = ((parseInt(id.charAt(0)) + (-1 + i)) + "" + (parseInt(id.charAt(1)) - 2));
                }
            }
        }
    }

    //Move gen depending if black or white
    if (isWhite) {
        knightgen(WPieces);
        console.log("White Knight");
    }
    else {
        knightgen(BPieces);
        console.log("Black Knight");
    }

    if (moves.length === 0) {
        return;
    }
    else {
        //this handles the clicking on a new square 
        if (isWhite) {
            var onClick = function (event) {
                globalOnClick(event, moves, id, onClick, WKnight);
            }
            $(".square").click(onClick);
            clicked = true;
        }
        else {
            var onClick = function (event) {
                globalOnClick(event, moves, id, onClick, BKnight);
            }
            $(".square").click(onClick);
            clicked = true;
        }
    }
}

//main method 2
select();