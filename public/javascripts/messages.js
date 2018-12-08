(function(exports){

    /* 
     * Client to server: game is complete, the winner is ... 
     */
    exports.T_GAME_WON_BY = "GAME-WON-BY";             
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    /*
     * Server to client: abort game (e.g. if second player exited the game) 
     */
    exports.O_GAME_ABORTED = {                          
        type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    /*
     * Server to client: person to make a move
     */
    exports.MAKE_MOVE = { type: "MAKE-MOVE" };
    exports.MAKE_MOVE = JSON.stringify(exports.MAKE_MOVE);

    /*
     * Server to client: set as player white
     */
    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_WHITE = {                            
        type: exports.T_PLAYER_TYPE,
        data: "WHITE"
    };
    exports.S_PLAYER_WHITE = JSON.stringify(exports.O_PLAYER_WHITE);

    /* 
     * Server to client: set as player black
     */
    exports.O_PLAYER_BLACK = {                            
        type: exports.T_PLAYER_TYPE,
        data: "BLACK"
    };
    exports.S_PLAYER_BLACK = JSON.stringify(exports.O_PLAYER_BLACK);

    /* 
     * Player white to server OR server to Player Black: this is the move white made  
     */
    exports.T_TARGET_MOVE_WHITE = "SET-MOVE_WHITE";
    exports.O_TARGET_MOVE_WHITE = {                         
        type: exports.T_TARGET_MOVE_WHITE,
        data: null
    };
    //exports.S_TARGET_MOVE_WHITE does not exist, as we always need to fill the data property

    /* 
     * Player Black to server OR server to Player White: this is the move Black made 
     */
    exports.T_TARGET_MOVE_BLACK = "SET_MOVE_BLACK";         
    exports.O_TARGET_MOVE_BLACK = {
        type: exports.T_TARGET_MOVE_BLACK,
        data: null
    };
    //exports.S_TARGET_MOVE_BLACK does not exist, as data needs to be set

    /* 
     * Server to Player A & B: game over with result won/loss 
     */
    exports.T_GAME_OVER = "GAME-OVER";              
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    };


}(typeof exports === "undefined" ? this.Messages = {} : exports));
//if exports is undefined, we are on the client; else the server
