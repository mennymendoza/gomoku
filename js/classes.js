// All classes used in the game

class Game {
    constructor(boardSize) {
        this.numberOfTurns = 0;
        this.playerTurn = 1;
        this.size = boardSize;
        this.board = []
    }
    // Updates the board when the player clicks on a cell.
    updateTable(cellId)
    // Checks to see if the current player has won.
    playerWins()
    // Given a cellId, returns an array containing x and y coordinates.
    getCoords()
}

class Tile {
    constructor(cellId, x, y) {
        this.id = cellId;
        this.xIndex = x;
        this.yIndex = y;
        this.empty = true;
        this.playerOwned = null;
    }
}