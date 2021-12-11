// All classes used in the game

"use strict";
let consoleBox = document.querySelector('#console-alert')
class Game {
    constructor() {
        // Properties
        this.numWins = [0, 0] // array, each element represents each player
        this.gamesPlayed = 0;
        this.playerColors = ["#000", "#fff"]
        
        this.restartGame();
    }

    restartGame() {

        // Gets all "option" options
        let collection = document.querySelectorAll("#options-menu select");
        
        // Sets background color
        let boardElem = document.getElementById("board");
        console.log(boardElem);
        boardElem.style.backgroundColor = collection[0].value;

        this.playerColors[0] = collection[2].value;
        this.playerColors[1] = collection[3].value;
        console.log(this.playerColors)

        // Class Properties
        this.numberOfTurns = 0;
        this.size = parseInt(collection[1].value);
        this.currentPlayer;
        this.boardArray = new Array();
        
        // Sets time and date properties for calculating duration
        const date = new Date();
        this.startTime = date.getTime();

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

        // if the board is empty
        if (this.boardArray[cellIndex].empty) {

            // Updates timer
            const date = new Date();
            let currentTime = date.getTime();

            let timer = document.getElementById("timer");
            let duration = (currentTime - this.startTime) / 1000;
            timer.innerText = `${parseInt(duration / 60)}:${parseInt(duration % 60).toString().padStart(2, '0')}`;

            this.decorateCell(cellId);
            this.boardArray[cellIndex].empty = false;
            this.boardArray[cellIndex].playerOwned = this.currentPlayer;

            // checks if player won
            if (this.playerWins(cellIndex)) {
                this.numberOfTurns++;
                this.endGame();
                return;
            }

            // increments turn
            this.numberOfTurns++;
        }
        else {
            // alert("Idiot! That cell has been clicked already!");
            consoleBox.innerHTML = "Idiot! That cell has been clicked already!";
            return;
        }
    }

    decorateCell(cellId) {
        // Gets HTML element of the cell to decorate
        let selectedCell = document.getElementById(cellId);

        // TODO: This can replace the code below
        // selectedCell.style.backgroundColor = this.playerColors[this.currentPlayer];

        if (!this.currentPlayer) {
            selectedCell.innerText = this.numberOfTurns + 1;
            selectedCell.style.backgroundColor = "#000";
            selectedCell.style.color = "#fff";
        }
        else {
            selectedCell.innerText = this.numberOfTurns + 1;
            selectedCell.style.backgroundColor = "#fff";
            selectedCell.style.color = "#000";
            // if first player
//             selectedCell.style.backgroundColor = this.playerColors[0];
//         }
//         else {
//             selectedCell.style.backgroundColor = this.playerColors[1];
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
            // alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
            consoleBox.innerHTML = "Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...";
            let pointsBox = document.getElementById(`points-${pieceCounter}-p${this.currentPlayer + 1}`)
            let points = parseInt(pointsBox.innerHTML) + 1;
            pointsBox.innerHTML = points;
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
            // alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
            consoleBox.innerHTML = "Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...";
            let pointsBox = document.getElementById(`points-${pieceCounter}-p${this.currentPlayer + 1}`)
            let points = parseInt(pointsBox.innerHTML) + 1;
            pointsBox.innerHTML = points;
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
            // alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
            consoleBox.innerHTML = "Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...";
            let pointsBox = document.getElementById(`points-${pieceCounter}-p${this.currentPlayer + 1}`)
            let points = parseInt(pointsBox.innerHTML) + 1;
            pointsBox.innerHTML = points;
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
            // alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
            consoleBox.innerHTML = "Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...";
            let pointsBox = document.getElementById(`points-${pieceCounter}-p${this.currentPlayer + 1}`)
            let points = parseInt(pointsBox.innerHTML) + 1;
            pointsBox.innerHTML = points;
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
            // alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
            consoleBox.innerHTML = "Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...";
            let pointsBox = document.getElementById(`points-${pieceCounter}-p${this.currentPlayer + 1}`)
            let points = parseInt(pointsBox.innerHTML) + 1;
            pointsBox.innerHTML = points;
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
            // alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
            consoleBox.innerHTML = "Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...";
            let pointsBox = document.getElementById(`points-${pieceCounter}-p${this.currentPlayer + 1}`)
            let points = parseInt(pointsBox.innerHTML) + 1;
            pointsBox.innerHTML = points;
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
            // alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
            consoleBox.innerHTML = "Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...";
            let pointsBox = document.getElementById(`points-${pieceCounter}-p${this.currentPlayer + 1}`)
            let points = parseInt(pointsBox.innerHTML) + 1;
            pointsBox.innerHTML = points;
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
            // alert("Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...");
            consoleBox.innerHTML = "Getting close to a win... Player " + this.currentPlayer + " has " + pieceCounter + " in a row...";
            let pointsBox = document.getElementById(`points-${pieceCounter}-p${this.currentPlayer + 1}`)
            let points = parseInt(pointsBox.innerHTML) + 1;
            pointsBox.innerHTML = points;
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
        // alert("Player " + this.currentPlayer.toString() + " wins!");
        consoleBox.innerHTML = "Player " + this.currentPlayer.toString() + " wins!";
        this.gamesPlayed++;
        this.numWins[this.currentPlayer]++;
        const date = new Date();
        const duration = (date.getTime() - this.startTime) / 1000;
        const game_won = 1 - this.currentPlayer;
        console.log(game_won);
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            console.log(xhr.response);
        }
        xhr.open("POST", "../../php/save_game.php");
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(`score=0&duration=${duration}&num_turns=${this.numberOfTurns}&game_won=${game_won}`);
    }

    toConsole(msg) {
        const consoleBox = document.querySelector("#console-alert");
        consoleBox.innerHTML += msg + "<br />";
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