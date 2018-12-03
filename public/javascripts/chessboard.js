//declaring some constants such as the standard chess board layout and the html unicode characters for chess pieces, 
//the numbers represent the chess pieces, with 6 a Black rook, 5 a Black Knight, 4 a Black Bishop, 3 a Black queen, 2 a black king, 1 a black pawn,
//all the negative numbers represent the white variants of the pieces

const WPawn = "&#9817;"
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

var WPieces = [WPawn, WRook, WKnight, WBishop, WQueen, WKing];
var BPieces = [BPawn, BRook, BKnight, BBishop, BQueen, BKing];


var board = [[WRook, WKnight, WBishop, WQueen, WKing, WBishop, WKnight, WRook],
[WPawn, WPawn, WPawn, WPawn, WPawn, WPawn, WPawn, WPawn],
[0, 0, 0, 0, 0, 0, BQueen, 0],
[0, BKing, 0, WRook, 0, 0, 0, 0],
[0, 0, 0, 0, BKnight, WKnight, 0, 0],
[0, 0, 0, WPawn, 0, 0, 0, 0],
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
            var div = $("<div>", {
                class: "square",
                id: i + "" + j,
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

//Audio Function on click.
var audio1 = document.getElementById("audioID");
function playAudio() {
    audio1.play();
}





//Main Method:
buildboard();
initialplacement();
