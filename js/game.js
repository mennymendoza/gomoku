// Game logic goes here

let game = new Game(15);

const restartGame = () => {
    game = new Game(15);
    let consoleBox = document.querySelector("#console-alert");
    consoleBox.innerHTML = "GOMOKU GAME";
}

function openButton() {
    document.querySelector('#options-menu').style.display = "block"
}
function closeButton() {
    document.querySelector('#options-menu').style.display = "none"
}