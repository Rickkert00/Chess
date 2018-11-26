//the creation of the chessboard tiles with each tile having its own unique id
//Row1 Rook;Knight;Bishop;Queen;King;Bishop;Knight;Rook
//Row2 Pawns
const BQueen = "&#9819;";
//This function creates a board
var buildboard = function () {
    //Loop that creates Rows
    for (var i = 1; i <= 8; i++) {
        var divRow = $("<div>", {
            class: "row"
        });
        //Loop that creates squares and Gives every square an ID based on its position, it also assigns the default locations of the pieces to the right tiles
        for (var j = 1; j <= 8; j++) {
            var piece = null;
            if (i === 2) {
                piece = "WP" + (j);
            }
            if (i === 7) {
                piece = "BP" + (j);
            }
            if (i===1 && j === 1) {
                piece = "WR1";
            }
            if (i===1 && (j) === 2) {
                piece = "WK1";
            }
            if (i===1 && (j) === 3) {
                piece = "WB1";
            }
            if (i===1 && (j) === 4) {
                piece = "WQueen";
            }
            if (i===1 && (j) === 5) {
                piece = "WKing";
            }
            if (i===1 && (j) === 6) {
                piece = "WB2";
            }
            if (i===1 && (j) === 7) {
                piece = "WK2";
            }
            if (i===1 && (j) === 8) {
                piece = "WR2";
            }

            if (i===8 && (j) === 1) {
                piece = "BR1";
            }
            if (i===8 && (j) === 2) {
                piece = "BK1";
            }
            if (i===8 && (j) === 3) {
                piece = "BB1";
            }
            if (i===8 && (j) === 4) {
                piece = "BQueen";
            }
            if (i===8 && (j) === 5) {
                piece = "BKing";
            }
            if (i===8 && (j) === 6) {
                piece = "BB2";
            }
            if (i===8 && (j) === 7) {
                piece = "BK2";
            }
            if (i===8 && j === 8) {
                piece = "BR2";
            }
            var div = $("<div>", {
                class: "square",
                id: String.fromCharCode(64 + j) + i,
                content: piece,
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
    for (var r = 1; r<=8; r++) {
        for (var c = 1; c<=8; c++) {
            if (r === 2) {
            $("#WP" + c).appendTo("[content=WP" + c + "]");  
            }
            if (r === 7) {
                 $("#BP" + c).appendTo("[content=BP" + c + "]");  
            }
            if (r===1 && c === 1) {
                $("#WR1").appendTo("[content=WR1]");  
            }
            if (r===1 && c === 2) {
                $("#WK1").appendTo("[content=WK1]");  
            }
            if (r===1 && c === 3) {
                $("#WB1").appendTo("[content=WB1]"); 
            }
            if (r===1 && c === 4) {
                $("#WQueen").appendTo("[content=WQueen]"); 
            }
            if (r===1 && c === 5) {
                $("#WKing").appendTo("[content=WKing]"); 
            }
            if (r===1 && c === 6) {
                $("#WB2").appendTo("[content=WB2]"); 
            }
            if (r===1 && c === 7) {
                $("#WK2").appendTo("[content=WK2]"); 
            }
            if (r===1 && c === 8) {
                $("#WR2").appendTo("[content=WR2]"); 
            }
            if (r===7 && c === 1) {
                $("#BR1").appendTo("[content=BR1]"); 
            }
            if (r===7 && c === 2) {
                $("#BK1").appendTo("[content=BK1]"); 
            }
            if (r===7 && c === 3) {
                $("#BB1").appendTo("[content=BB1]"); 
            }
            if (r===7 && c === 4) {
                $("#BQueen").appendTo("[content=BQueen]"); 
            }
            if (r===7 && c === 5) {
                $("#BKing").appendTo("[content=BKing]"); 
            }
            if (r===7 && c === 6) {
                $("#BB2").appendTo("[content=BB2]"); 
            }
            if (r===7 && c === 7) {
                $("#BK2").appendTo("[content=BK2]"); 
            }
            if (r===7 && c === 8) {
                $("#BR2").appendTo("[content=BR2]");
            }
      }
    }
}

var chessPieces = function () {
    document.getElementById('D5')
    console.log("Adding pawn");
}


//Main Method:
buildboard();
initialplacement();
