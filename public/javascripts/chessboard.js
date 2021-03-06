//declaring some constants such as the standard chess board layout and the html unicode characters for chess pieces, 
//the numbers represent the chess pieces, with 6 a Black rook, 5 a Black Knight, 4 a Black Bishop, 3 a Black queen, 2 a black king, 1 a black pawn,
//all the negative numbers represent the white variants of the pieces

var WPawn = "&#9817;"
var BPawn = "&#9823;";
var WRook = "&#9814;";
var BRook = "&#9820;";
var WKnight = "&#9816;";
var BKnight = "&#9822;";
var WBishop = "&#9815;";
var BBishop = "&#9821;";
var WKing = "&#9812;";
var BKing = "&#9818;";
var WQueen = "&#9813;";
var BQueen = "&#9819;";

var WPieces = [WPawn, WRook, WKnight, WBishop, WQueen, WKing];
var BPieces = [BPawn, BRook, BKnight, BBishop, BQueen, BKing];
var isFullScreen = false;

var board = [[WRook, WKnight, WBishop, WQueen, WKing, WBishop, WKnight, WRook],
[WPawn, WPawn, WPawn, WPawn, WPawn, WPawn, WPawn, WPawn],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[BPawn, BPawn, BPawn, BPawn, BPawn, BPawn, BPawn, BPawn],
[BRook, BKnight, BBishop, BQueen, BKing, BBishop, BKnight, BRook]];


//This function creates a board with tiles 
var buildboard = function () {
    //Loop that creates Rows
    for (let i = 7; i >= 0; i--) {
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
    for (let r = 0; r <= 7; r++) {
        for (let c = 0; c <= 7; c++) {
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
//enable fullscreen
var goFullScreen = function () {
    $("#goFullScreen").click(function (event) {
        if (isFullScreen === false) {
            if (document.body.requestFullscreen) {
                document.body.requestFullscreen();
            } else if (document.body.mozRequestFullScreen) {
                document.body.mozRequestFullScreen();
            } else if (document.body.webkitRequestFullScreen) {
                document.body.webkitRequestFullScreen();
            } else if (document.body.msRequestFullscreen) {
                document.body.msRequestFullscreen();
            }
            document.getElementById(event.target.id).innerHTML = "Disable Fullscreen";
            isFullScreen = true;
        }
        else if (isFullScreen === true) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            document.getElementById(event.target.id).innerHTML = "Enable Fullscreen";
            isFullScreen = false;
        }
    });
};

//Main Method:
buildboard();
initialplacement();
goFullScreen();