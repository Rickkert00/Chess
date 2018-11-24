//the creation of the chessboard tiles with each tile having its own unique id
//Row1 Rook;Knight;Bishop;Queen;King;Bishop;Knight;Rook
//Row2 Pawns
const BQueen= "&#9819;"; 
//This function creates a board
var buildboard = function () {
    //Loop that creates Rows
    for (var i = 1; i <= 8; i++) {
        var divRow = $("<div>", {
            class: "row"
        });
        //Loop that creates squares and Gives every square an ID based on its position 
        for (var j = 1; j <= 8; j++) {
            var div = $("<div>", {
                class: "square",
                id: String.fromCharCode(64+j)+i,
            });

            //Add white or Black class to every second div;
            if (i % 2 == j % 2) {
                $(div).addClass("white");
            } else {
                $(div).addClass("black");
            }
            divRow.append(div);
        }
        $("#GameBoard").append(divRow);
    }
};


var initialplacement = function(){
    //document.getElementById('D5').innerHTML = document.getElementById('BP1').outerHTML;
    $("#WP1").appendTo("#A2");
    $("#BP2").appendTo("#D4");
    $("#BP3").appendTo("#D3");
    $("#BP4").appendTo("#D2");
    $("#BP5").appendTo("#D1");
    $("#BQueen").appendTo("#A3");
}

var chessPieces = function() {
document.getElementById('D5')
console.log("Adding pawn");  
}




//Main Method:
buildboard();
initialplacement();
