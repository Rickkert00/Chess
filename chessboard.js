//the creation of the chessboard tiles with each tile having its own unique id

$(document).ready(function() {
    for (var r = 8; r>0; r--) {
        var col = "";
        for (var c = 65; c<73; c++) {
            var cString = String.fromCharCode(c);
            col+="<td id='"+ cString + String.toString(r) +"'></td>"; }
            $("#board").append("<tr>"+col+"</tr>");
        }
    }
);