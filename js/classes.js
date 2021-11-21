// All classes used in the game

"use strict";

class Game {
    constructor(boardSize) {
        this.numberOfTurns = 0;
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
        this.currentPlayer = this.numberOfTurns % 2;

        if (this.boardArray[cellIndex].empty) {
            // if the board is empty
            this.decorateCell(cellId);
            this.boardArray[cellIndex].empty = false;
            this.boardArray[cellIndex].playerOwned = this.currentPlayer;
            
            // checks if player won
            if (this.playerWins(cellIndex)) {
                this.endGame();
                return;
            }

            // increments turn
            this.numberOfTurns++;
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
        let origIndex = this.getIndex(x, y);
        
        let pieceCounter = 0;
        let nextX = x;
        let nextY = y;
        let nextIndex = origIndex;
        // Checks for win (north)
        while (nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size && !this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
            pieceCounter++;
            nextY--;
            nextIndex = this.getIndex(nextX, nextY);
        }
        if (pieceCounter === 3 || pieceCounter === 4) {
            alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
        }
        if (pieceCounter === 5) {
            return true;
        }

        pieceCounter = 0;
        nextX = x;
        nextY = y;
        nextIndex = origIndex;
        // Checks for win (south)
        while (nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size && !this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
            pieceCounter++;
            nextY++;
            nextIndex = this.getIndex(nextX, nextY);
        }
        if (pieceCounter === 3 || pieceCounter === 4) {
            alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
        }
        if (pieceCounter === 5) {
            return true;
        }

        pieceCounter = 0;
        nextX = x;
        nextY = y;
        nextIndex = origIndex;
        // Checks for win (east)
        while (nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size && !this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
            pieceCounter++;
            nextX++;
            nextIndex = this.getIndex(nextX, nextY);
        }
        if (pieceCounter === 3 || pieceCounter === 4) {
            alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
        }
        if (pieceCounter === 5) {
            return true;
        }

        pieceCounter = 0;
        nextX = x;
        nextY = y;
        nextIndex = origIndex;
        // Checks for win (west)
        while (nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size && !this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
            pieceCounter++;
            nextX--;
            nextIndex = this.getIndex(nextX, nextY);
        }
        if (pieceCounter === 3 || pieceCounter === 4) {
            alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
        }
        if (pieceCounter === 5) {
            return true;
        }

        pieceCounter = 0;
        nextX = x;
        nextY = y;
        nextIndex = origIndex;
        // Checks for win (south east diagonal)
        while (nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size && !this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
            pieceCounter++;
            nextX++;
            nextY++;
            nextIndex = this.getIndex(nextX, nextY);
        }
        if (pieceCounter === 3 || pieceCounter === 4) {
            alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
        }
        if (pieceCounter === 5) {
            return true;
        }

        pieceCounter = 0;
        nextX = x;
        nextY = y;
        nextIndex = origIndex;
        // Checks for win (north east diagonal)
        while (nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size && !this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
            pieceCounter++;
            nextX++;
            nextY--;
            nextIndex = this.getIndex(nextX, nextY);
        }
        if (pieceCounter === 3 || pieceCounter === 4) {
            alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
        }
        if (pieceCounter === 5) {
            return true;
        }

        pieceCounter = 0;
        nextX = x;
        nextY = y;
        nextIndex = origIndex;
        // Checks for win (north west diagonal)
        while (nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size && !this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
            pieceCounter++;
            nextX--;
            nextY--;
            nextIndex = this.getIndex(nextX, nextY);
        }
        if (pieceCounter === 3 || pieceCounter === 4) {
            alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
        }
        if (pieceCounter === 5) {
            return true;
        }

        pieceCounter = 0;
        nextX = x;
        nextY = y;
        nextIndex = origIndex;
        // Checks for win (south west diagonal)
        while (nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size && !this.boardArray[nextIndex].empty && this.boardArray[nextIndex].playerOwned == this.currentPlayer) {
            pieceCounter++;
            nextX--;
            nextY++;
            nextIndex = this.getIndex(nextX, nextY);
        }
        if (pieceCounter === 3 || pieceCounter === 4) {
            alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
        }
        if (pieceCounter === 5) {
            return true;
        }

        return false;
    }
    
    // Given a cellId, returns an array containing x and y coordinates.
    getIndex(x, y) {
        return this.size * y + x;
    }

    // Does whatever needs to happen when the game ends
    endGame() {
        alert("Player " + this.currentPlayer.toString() + " wins!");
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            console.log(xhr.response);
        }
        xhr.open("POST", "../../php/save_game.php");
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send("score=0&duration=100&num_turns=" + this.numberOfTurns);
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