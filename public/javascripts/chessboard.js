//declaring some constants such as the standard chess board layout and the html unicode characters for chess pieces, 
//the numbers represent the chess pieces, with 6 a Black rook, 5 a Black Knight, 4 a Black Bishop, 3 a Black queen, 2 a black king, 1 a black pawn,
//all the negative numbers represent the white variants of the pieces
const WPawn = {
    unicode: "&#9817;",
    color: "White"};
const BPawn = "&#9823;";
const WRook = "&#9814;";
const BRook = "&#9820;";
const WKnight = "&#9816;";
const BKnight = "&#9822;";
const WBishop = "&#9815;";
const BBishop = "&#9821;";
const WKing = "&#9812;";
const BKing = "&#9818;";
const WQueen = "&#9813;";
const BQueen = "&#9819;";

var board = [[WRook, WKnight, WBishop, WQueen, WKing, WBishop, WKnight, WRook],
[WPawn.unicode, WPawn.unicode, WPawn.unicode, WPawn.unicode, WPawn.unicode, WPawn.unicode, WPawn.unicode, WPawn.unicode],
[0, 0, 0, 0, 0, 0, BQueen, 0],
[0, BKing, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, WPawn.unicode, 0, 0, 0, 0],
[BPawn, BPawn, BPawn, BPawn, BPawn, BPawn, BPawn, BPawn],
[BRook, BKnight, BBishop, BQueen, BKing, BBishop, BKnight, BRook]];


//This function creates a board with tiles 
var buildboard = function () {

    //Loop that creates Rows
    for (var i = 7; i >= 0; i--) {
        var divRow = $("<div>", {
            class: "row",
        });
        //Loop that creates squares and Gives every square an ID based on its position, it also assigns the default locations of the pieces to the right tiles
        for (var j = 0; j <= 7; j++) {
            var piece = null;
            if (i === 1) {
                piece = WPawn;
            }
            if (i === 6) {
                piece = BPawn;
            }
            if (i === 0 && j === 0) {
                piece = WRook;
            }
            if (i === 0 && (j) === 1) {
                piece = BKnight;
            }
            if (i === 0 && (j) === 2) {
                piece = WBishop;
            }
            if (i === 0 && (j) === 3) {
                piece = WQueen;
            }
            if (i === 0 && (j) === 4) {
                piece = WKing;
            }
            if (i === 0 && (j) === 5) {
                piece = WBishop;
            }
            if (i === 0 && (j) === 6) {
                piece = WKnight;
            }
            if (i === 0 && (j) === 7) {
                piece = WRook;
            }

            if (i === 7 && (j) === 0) {
                piece = BRook;
            }
            if (i === 7 && (j) === 1) {
                piece = BKnight;
            }
            if (i === 7 && (j) === 2) {
                piece = BBishop;
            }
            if (i === 7 && (j) === 3) {
                piece = BQueen;
            }
            if (i === 7 && (j) === 4) {
                piece = BKing;
            }
            if (i === 7 && (j) === 5) {
                piece = BBishop;
            }
            if (i === 7 && (j) === 6) {
                piece = BKnight;
            }
            if (i === 7 && j === 7) {
                piece = BRook;
            }
            var div = $("<div>", {
                class: "square",
                id: i + "" + j,
                content: piece,
                onmousedown: "playAudio()",
            });

            //Add white or Black class to every second div;
            if (i % 2 == j % 2) {
                $(div).addClass("white");
            } else {
                $(div).addClass("black");
            }
            //initialize tiles to contain standard piece layout
            divRow.append(div);
        }
        $("#GameBoard").append(divRow);
    }
};

//place the pieces on the starting tiles
var initialplacement = function () {
    for (var r = 0; r <= 7; r++) {
        for (var c = 0; c <= 7; c++) {
            if (board[r][c] !== 0) {
                document.getElementById(r + "" + c).innerHTML = board[r][c];//place all pieces on the board
            }
            else {
                document.getElementById(r + "" + c).innerHTML = "";//set all other tiles to have no piece on them
            }
        }
    }
}


var audio1 = document.getElementById("audioID");
function playAudio() {
    audio1.play();
}

var select = function () {
    $(".square").click(function (event) {
        parser = new DOMParser;//needed to parse the unicode to actual images so the comparison in the cases goes right
        switch (document.getElementById(event.target.id).innerHTML) {//get the content of the clicked tile
            case parser.parseFromString(WPawn.unicode, 'text/html').body.textContent: MoveWPawn(event.target.id);//this converts the const to an image so the comparison goes right
                break;
            case BPawn: MoveBPawn();
                break;
        }
    }
    );

}
//this function computes all possible moves for the white pawn that is currently selected via a click
var MoveWPawn = function (id) {
    var moves = [];
    parser = new DOMParser;
    if (((!(parseInt(id.charAt(1)) - 1 < 0)))) {//this checks whether the left diagonal tile is not out of board range
        if (board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)) - 1)] !== 0) {//this checks whether there is a piece or not on the left diagonal tile from the selected piece
            console.log(board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)) - 1)].charAt(0));
            console.log(board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)) - 1)].color);
            //fix white checking
            if (board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)) - 1)].color !== "White") {//this checks whether the piece is white or black
                document.getElementById((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1)) - 1)).style.background = "green";//sets the tile background to green if the piece is black , it indicates that is is a legal move
                moves[moves.length] = ((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1))- 1));
                        }
        }
    }

    if (!(parseInt(id.charAt(1)) + 1 > 7)) {//checks whether the right diagonal tile is not out of board range
        if (board[parseInt(id.charAt(0)) + 1][parseInt(id.charAt(1)) + 1] !== 0) {//checks whether the right diagonal tile is empty or not
            if (board[parseInt(id.charAt(0)) + 1][parseInt(id.charAt(1)) + 1].color !== "White") {//checks whether it is black or white
                document.getElementById((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1)) + 1)).style.background = "green";//if black then mark it as a possible move
                moves[moves.length] = ((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1))+ 1));
            }
        }
    }

    if (!((parseInt(id.charAt(0)) + 1) > 7)) {//check whether tile straight ahead is out of board range
        if (board[parseInt(id.charAt(0)) + 1][parseInt((id.charAt(1)))] === 0) {//check whether the tile ahead is emtpy or not
            document.getElementById((parseInt(id.charAt(0)) + 1) + "" + id.charAt(1)).style.background = "green";//if empty then mark possible move
            moves[moves.length] = ((parseInt(id.charAt(0)) + 1) + "" + (parseInt(id.charAt(1))));
            if (parseInt(id.charAt(0)) === 1) {//check whether the pawn is still in the default row to check for double tile move
                if (board[parseInt(id.charAt(0)) + 2][parseInt((id.charAt(1)))] === 0) {//check whether the tile 2 rows above is empty or not
                    document.getElementById((parseInt(id.charAt(0)) + 2) + "" + id.charAt(1)).style.background = "green";//if empty then mark possible move
                    moves[moves.length] = ((parseInt(id.charAt(0)) + 2) + "" + (parseInt(id.charAt(1))));
                }
            }

        }
    }
    $(".square").click(function (event) {
        for (var i = 0; i<moves.length; i++) {
        if (event.target.id === moves[i]){
            board[parseInt(event.target.id.charAt(0))][parseInt(event.target.id.charAt(1))] = WPawn.unicode;
            board[parseInt(id.charAt(0))][parseInt(id.charAt(1))] = 0;
            initialplacement();
            for (j = 0; j< moves.length; j++) {
                if (parseInt(moves[j].charAt(0)) % 2 === parseInt(moves[j].charAt(1) % 2)) {
                    document.getElementById(moves[j]).style.background = "white";
                } else {
                    document.getElementById(moves[j]).style.background = "gray";
                }
            }
            console.log(board[1][6].charAt(0));
            return;
        }
    }
    });
}




// var selectTarget = function (originContent, originLocation) {
//     var target;
//     $(".square").click(function (event) {
//         document.getElementById(event.target.id).style.backgroundColor = "blue";
//         target = document.getElementById(event.target.id).getAttribute('id');
//         document.getElementById('' + target + '').setAttribute('content', originContent);
//         document.getElementById(originLocation).setAttribute('content', null);
//         $("#" + originContent).appendTo("[content=" + originContent + "]");

//     });
// }

//Main Method:
buildboard();
initialplacement();
select();
