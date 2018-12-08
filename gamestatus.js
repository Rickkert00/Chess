var gameStatus = {
    since : Date.now(),     /* time since game started */
    totalGames : 0,         /* number of games started */
    gamesAborted : 0,       /* number of games aborted */
    gamesCompleted : 0      /* number of games successfully completed */
};

module.exports = gameStatus;