// Game logic goes here

let game = new Game(15);

const restartGame = () => {
    game = new Game(15);
    let consoleBox = document.querySelector("#console-alert");
    consoleBox.innerHTML = "GOMOKU GAME";
}