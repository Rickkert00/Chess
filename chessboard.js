//the creation of the chessboard tiles with each tile having its own unique id

$(document).ready(function() {
    var space = 1;
    for (var r = 0; r<8; r++) {
        var col = "";
        for (var c = 0; c<8; c++) {
            col+="<td pos='"+space+"'></td>"; space++; }
            $("#board").append("<tr>"+col+"</tr>");
        }
    }
);