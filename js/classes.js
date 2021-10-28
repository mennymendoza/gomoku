// All classes used in the game

"use strict";

class Game {
    constructor(boardSize) {
        this.numberOfTurns = 0;
        this.playerTurn = 1;
        this.size = boardSize;
        this.boardArray = new Array();

        // Constucts board array and creates HTML table to represent board.
        let html = "";
        let cellIndex = 0;
        for (let i = 0; i < this.size; i++) {
            html += "<tr>";
            for (let j = 0; j < this.size; j++) {
                html += "<td id='tile-" + cellIndex.toString() + "' onclick='game.updateTable(id)'></td>";
                this.boardArray.push(new Tile(cellIndex, i, j));
                cellIndex++;
            }
            html += "</tr>";
            document.querySelector("#board table").innerHTML = html;
        }
    }

    // Updates the board when the player clicks on a cell.
    updateTable(cellId) {

        // index of cell that was clicked (for accessing the array)
        let cellIndex = parseInt(cellId.substring(5));
        
        // id of player who clicked them (0 or 1)
        let currentPlayer = this.playerTurn % 2;

        if (this.boardArray[cellIndex].empty) {
            // if the board is empty
            this.decorateCell(cellId);
            this.boardArray[cellIndex].empty = false;
            this.boardArray[cellIndex].playerOwned = currentPlayer;
            
            // checks if player won
            if (this.playerWins(cellIndex)) {
                alert("Player " + currentPlayer.toString() + " wins!");
                return;
            }

            // increments turn
            this.playerTurn++;
        }
        else {
            alert("Idiot! That cell has been clicked already!");
            return;
        }
    }

    decorateCell(cellId) {
        // Gets HTML element of the cell to decorate
        let selectedCell = document.getElementById(cellId);

        // id of player who clicked them (0 or 1)
        let currentPlayer = this.playerTurn % 2;

        // checks which player's turn it is and decorates accordingly
        if (currentPlayer) {
            selectedCell.style.backgroundColor = "#000";
        }
        else {
            selectedCell.style.backgroundColor = "#fff";
        }
    }

    // Checks to see if the current player has won.
    playerWins(cellIndex) {
        return false;
    }
    // Given a cellId, returns an array containing x and y coordinates.
    getCoords(cellIndex) {
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