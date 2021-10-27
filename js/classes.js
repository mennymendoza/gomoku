// All classes used in the game

"use strict";

class Game {
    constructor(boardSize) {
        this.numberOfTurns = 0;
        this.playerTurn = 1;
        this.size = boardSize;
        this.board = []

        let html = ""
        for (let i = 0; i < this.size; i++) {
            html += "<tr>"
            for (let j = 0; j < this.size; j++) {
                html += "<td></td>"
            }
            html += "</tr>"
            document.querySelector("#board table").innerHTML = html;
        }
    }

    // Updates the board when the player clicks on a cell.
    updateTable(cellId) {
        // code goes here
    }
    // Checks to see if the current player has won.
    playerWins() {
        // code goes here
    }
    // Given a cellId, returns an array containing x and y coordinates.
    getCoords() {
        // code goes here
    }
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