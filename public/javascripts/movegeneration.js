var clicked = false;
//add white or black turn selection into switch statement
var select = function () {
    $(".square").click(function (event) {
        if (clicked === false) {
            parser = new DOMParser;//needed to parse the unicode to actual images so the comparison in the cases goes right
            switch (document.getElementById(event.target.id).innerHTML) {//get the content of the clicked tile
                case parser.parseFromString(WPawn, 'text/html').body.textContent: MoveWPawn(event.target.id);//this converts the const to an image so the comparison goes right
                    clicked = true;
                    break;
                case BPawn: MoveBPawn();
                    clicked = true;
                    break;
                case parser.parseFromString(WRook, 'text/html').body.textContent: MoveRook(event.target.id, true);
                    clicked = true;
                    break;
                case parser.parseFromString(WBishop, 'text/html').body.textContent: MoveBishop(event.target.id, true);
                    clicked = true;
                    break;
                case parser.parseFromString(WKnight, 'text/html').body.textContent: MoveKnight(event.target.id, true);
                    clicked = true;
                    break;
                case parser.parseFromString(WQueen, 'text/html').body.textContent: MoveQueen(event.target.id, true);
                    clicked = true;
                    break;
                case parser.parseFromString(WKing, 'text/html').body.textContent: MoveKing(event.target.id, true);
                    clicked = true;
                    break;
                case parser.parseFromString(BRook, 'text/html').body.textContent: MoveRook(event.target.id, false);
                    clicked = true;
                    break;
                case parser.parseFromString(BBishop, 'text/html').body.textContent: MoveBishop(event.target.id, false);
                    clicked = true;
                    break;
                case parser.parseFromString(BKnight, 'text/html').body.textContent: MoveKnight(event.target.id, false);
                    clicked = true;
                    break;
                case parser.parseFromString(BQueen, 'text/html').body.textContent: MoveQueen(event.target.id, false);
                    clicked = true;
                    break;
                case parser.parseFromString(BKing, 'text/html').body.textContent: MoveKing(event.target.id, false);
                    clicked = true;
                    break;

            }

        }

    }
    );

}
//this function checks whether you clicked on one of the possible moves or not and then moves the pieces accordingly or resets the clicking event
var globalOnClick = function (event, moves, id, onClick, piece) {
    if (clicked) {
        for (var i = 0; i < moves.length; i++) {
            if (event.target.id === moves[i]) {
                clicked = false;
                board[parseInt(event.target.id.charAt(0))][parseInt(event.target.id.charAt(1))] = piece;
                board[parseInt(id.charAt(0))][parseInt(id.charAt(1))] = 0;
                initialplacement();
                for (j = 0; j < moves.length; j++) {
                    if (parseInt(moves[j].charAt(0)) % 2 === parseInt(moves[j].charAt(1) % 2)) {
                        document.getElementById(moves[j]).style.background = "white";
                    } else {
                        document.getElementById(moves[j]).style.background = "gray";
                    }
                }
                $(".square").unbind("click", onClick);
                return;
            }

        }
        for (j = 0; j < moves.length; j++) {
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

//this function computes all possible moves for the white pawn that is currently selected via a click
var MoveWPawn = function (id) {
    var moves = [];
    if (((!(parseInt(id.charAt(1)) - 1 < 0)))) {//this checks whether the left diagonal tile is not out of board range

        if (board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)) - 1)] !== 0) {//this checks whether there is a piece or not on the left diagonal tile from the selected piece
            //fix white checking
            if (BPieces.includes(board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)) - 1)])) {//this checks whether the piece is white or black
                document.getElementById((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1)) - 1)).style.background = "lightgreen";//sets the tile background to green if the piece is black , it indicates that is is a legal move
                moves[moves.length] = ((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1)) - 1));
            }

        }
    }
    if (!(parseInt(id.charAt(1)) + 1 > 7)) {//checks whether the right diagonal tile is not out of board range
        if (board[parseInt(id.charAt(0)) + 1][parseInt(id.charAt(1)) + 1] !== 0) {//checks whether the right diagonal tile is empty or not  

            if (BPieces.includes(board[parseInt(id.charAt(0)) + 1][parseInt(id.charAt(1)) + 1])) {//checks whether it is black or white
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
    //this handles the clicking on a new square 
    var onClick = function (event) {
        globalOnClick(event, moves, id, onClick, WPawn);
    }
    $(".square").click(onClick);
}

var MoveRook = function (id, isWhite) {
    var moves = [];
    for (var i = 0; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) + i) > 7)) {//checks whether the tile(s) above the rook are out of board range

            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))] === 0) {

                document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
            }
            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))] !== 0) {
                if (isWhite) {
                    console.log(parseInt(id.charAt(0)) + i);
                    if (BPieces.includes(board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))])) {
                        console.log("test3");
                        document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
                        i = 7;
                    }
                }
                else {
                    console.log("test4");
                    document.getElementById((parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                    moves[moves.length] = (parseInt(id.charAt(0)) + i) + "" + (parseInt(id.charAt(1)));
                    i = 7;
                }

            }
        }
    }


    for (var i = 0; i <= 7; i++) {
        if (!(((parseInt(id.charAt(0))) - i) < 0)) {//checks whether the tile(s) below the rook are out of board range
            if (board[parseInt(id.charAt(0)) + i][parseInt((id.charAt(1)))] === 0) {
                document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)));
            }
            if (board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0)) - i][parseInt((id.charAt(1)))])) {
                        document.getElementById((parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)))).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0)) - i) + "" + (parseInt(id.charAt(1)));
                        i = 7;
                    }
                }

            }
        }
    }

    for (var i = 0; i <= 7; i++) {
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
                        i = 7;
                    }
                }

            }
        }
    }


    for (var i = 0; i <= 7; i++) {
        if (!(((parseInt(id.charAt(1))) + i) < 0)) {//checks whether the tile(s) right of the rook are out of board range
            if (board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) + i] === 0) {
                document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
            }
            if (board[parseInt(id.charAt(0))][parseInt((id.charAt(1)) + i)] !== 0) {
                if (isWhite) {
                    if (BPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
                        i = 7;
                    }
                }
                else {
                    if (WPieces.includes(board[parseInt(id.charAt(0))][parseInt((id.charAt(1))) + i])) {
                        document.getElementById((parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i)).style.background = "lightgreen";
                        moves[moves.length] = (parseInt(id.charAt(0))) + "" + (parseInt(id.charAt(1)) + i);
                        i = 7;
                    }

                }
            }
        }
    }

    var onClick = function (event) {
        globalOnClick(event, moves, id, onClick, WRook);
    }
    $(".square").click(onClick);
}



var MoveKnight = function (id, isWhite) {
    var moves = [];

    //Move Generation
    var knightgen = function (allyArray) {
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
        console.log("white");
    }
    else {
        knightgen(BPieces);
        console.log("black");
    }

    //this handles the clicking on a new square 
    if (isWhite) {
        var onClick = function (event) {
            globalOnClick(event, moves, id, onClick, WKnight);
        }
        $(".square").click(onClick);
    }
    else {
        var onClick = function (event) {
            globalOnClick(event, moves, id, onClick, BKnight);
        }
        $(".square").click(onClick);
    }
}

//main method 2
select();