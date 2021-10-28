// All classes used in the game

"use strict";

class Game {
    constructor(boardSize) {
        this.numberOfTurns = 0;
        this.playerTurn = 0;
        this.size = boardSize;
        this.currentPlayer;
        this.boardArray = new Array();

        // Constucts board array and creates HTML table to represent board.
        let html = "";
        let cellIndex = 0;
        for (let i = 0; i < this.size; i++) {
            html += "<tr>";
            for (let j = 0; j < this.size; j++) {
                html += "<td id='tile-" + cellIndex.toString() + "' onclick='game.updateTable(id)'></td>";
                this.boardArray.push(new Tile(cellIndex, j, i));
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
        
        // Set global variable to id of current player (0 or 1)
        this.currentPlayer = this.playerTurn % 2;

        if (this.boardArray[cellIndex].empty) {
            // if the board is empty
            this.decorateCell(cellId);
            this.boardArray[cellIndex].empty = false;
            this.boardArray[cellIndex].playerOwned = this.currentPlayer;
            
            // checks if player won
            if (this.playerWins(cellIndex)) {
                alert("Player " + this.currentPlayer.toString() + " wins!");
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

        // checks which player's turn it is and decorates accordingly
        if (this.currentPlayer) {
            selectedCell.style.backgroundColor = "#000";
        }
        else {
            selectedCell.style.backgroundColor = "#fff";
        }
    }

    // Checks to see if the current player has won.
    playerWins(cellIndex) {
        let x = this.boardArray[cellIndex].xIndex;
        let y = this.boardArray[cellIndex].yIndex;
        let pieceCounter = 0;
        // Checks for win (north)
        for (let i = 0; i < 5; i++) {
            let newY = y - i;
            let nextIndex = this.getIndex(x, newY);
            if (nextIndex >= this.boardArray.length || nextIndex < 0 || newY >= this.size || newY < 0) {
                break;
            }
            if (!this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
                pieceCounter++;
            }
        }
        if (pieceCounter === 5) {
            return true;
        }
        else {
            pieceCounter = 0;
        }

        // Checks for win (south)
        for (let i = 0; i < 5; i++) {
            let newY = y + i;
            let nextIndex = this.getIndex(x, newY);
            if (nextIndex >= this.boardArray.length || nextIndex < 0 || newY >= this.size || newY < 0) {
                break;
            }
            if (!this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
                pieceCounter++;
            }
        }
        if (pieceCounter === 5) {
            return true;
        }
        else {
            pieceCounter = 0;
        }

        // Checks for win (east)
        for (let i = 0; i < 5; i++) {
            let newX = x + i;
            let nextIndex = this.getIndex(newX, y);
            if (nextIndex >= this.boardArray.length || nextIndex < 0 || newX >= this.size || newX < 0) {
                break;
            }
            if (!this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
                pieceCounter++;
            }
        }
        if (pieceCounter === 5) {
            return true;
        }
        else {
            pieceCounter = 0;
        }

        // Checks for win (west)
        for (let i = 0; i < 5; i++) {
            let newX = x - i;
            let nextIndex = this.getIndex(newX, y);
            if (nextIndex >= this.boardArray.length || nextIndex < 0 || newX >= this.size || newX < 0) {
                break;
            }
            if (!this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
                pieceCounter++;
            }
        }
        if (pieceCounter === 5) {
            return true;
        }
        else {
            pieceCounter = 0;
        }

        // Checks for win (south east diagonol)
        for (let i = 0; i < 5; i++) {
            let newX = x + i;
            let newY = y + i;
            let nextIndex = this.getIndex(newX, newY);
            if (nextIndex >= this.boardArray.length || nextIndex < 0 || newX >= this.size || newY >= this.size || newX < 0 || newY < 0) {
                break;
            }
            if (!this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
                pieceCounter++;
            }
        }
        if (pieceCounter === 5) {
            return true;
        }
        else {
            pieceCounter = 0;
        }

        // Checks for win (north east diagonol)
        for (let i = 0; i < 5; i++) {
            let newX = x + i;
            let newY = y - i;
            let nextIndex = this.getIndex(newX, newY);
            if (nextIndex >= this.boardArray.length || nextIndex < 0 || newX >= this.size || newY >= this.size || newX < 0 || newY < 0) {
                break;
            }
            if (!this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
                pieceCounter++;
            }
        }
        if (pieceCounter === 5) {
            return true;
        }
        else {
            pieceCounter = 0;
        }

        // Checks for win (north west diagonol)
        for (let i = 0; i < 5; i++) {
            let newX = x - i;
            let newY = y - i;
            let nextIndex = this.getIndex(newX, newY);
            if (nextIndex >= this.boardArray.length || nextIndex < 0 || newX >= this.size || newY >= this.size || newX < 0 || newY < 0) {
                break;
            }
            if (!this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
                pieceCounter++;
            }
        }
        if (pieceCounter === 5) {
            return true;
        }
        else {
            pieceCounter = 0;
        }

        // Checks for win (south west diagonol)
        for (let i = 0; i < 5; i++) {
            let newX = x - i;
            let newY = y + i;
            let nextIndex = this.getIndex(newX, newY);
            if (nextIndex >= this.boardArray.length || nextIndex < 0 || newX >= this.size || newY >= this.size || newX < 0 || newY < 0) {
                break;
            }
            if (!this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
                pieceCounter++;
            }
        }
        if (pieceCounter === 5) {
            return true;
        }
        else {
            pieceCounter = 0;
        }

        return false;
    }
    
    // Given a cellId, returns an array containing x and y coordinates.
    getIndex(x, y) {
        return this.size * y + x;
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