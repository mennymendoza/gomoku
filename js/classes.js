// All classes used in the game

"use strict";

class Game {
    constructor(boardSize) {
        this.numberOfTurns = 0;
        this.playerTurn = 1;
        this.size = boardSize;
        this.boardArray = new Array();

        // Constucts board array and creates HTML table to represent board.
        let html = ""
        let cellIndex = 0;
        for (let i = 0; i < this.size; i++) {
            let row = []
            html += "<tr>"
            for (let j = 0; j < this.size; j++) {
                html += "<td id='tile-" + cellIndex.toString() + "' onclick='game.updateTable(id)'></td>"
                row.push(new Tile(cellIndex, i, j));
                cellIndex++;
            }
            this.boardArray.push(row);
            html += "</tr>"
            document.querySelector("#board table").innerHTML = html;
        }
        console.log(this.boardArray);
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
    constructor(cellIndex, x, y) {
        this.index = cellIndex;
        this.xIndex = x;
        this.yIndex = y;
        this.empty = true;
        this.playerOwned = null;
    }
}