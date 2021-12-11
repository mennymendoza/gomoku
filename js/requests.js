
"use strict";

const login = () => {
    let username = document.getElementById("email-address");
    let password = document.getElementById("password");
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.response == 'correct') {
            window.location.replace("../game/index.html");
        }
        else {
            let errorDiv = document.getElementById('error-sect');
            let errorDivText = document.querySelector('#error-sect p');
            errorDivText.innerHTML = xhr.response;
            errorDiv.style.display = 'block';
        }
    }
    xhr.open("POST", "../../php/login.php");
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send("user=" + username.value + "&pass=" + password.value);
}

const logout = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        console.log(xhr.response);
        if (xhr.response === "success") {
            window.location.replace('../../index.html')
        }
    }
    xhr.open("POST", "../../php/logout.php");
    xhr.send();
}

const signup = () => {
    let username = document.getElementById("email-address");
    let password = document.getElementById("password");
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.response == 'success') {
            window.location.replace("../game/index.html");
        }
        else {
            let errorDiv = document.getElementById('error-sect');
            let errorDivText = document.querySelector('#error-sect p');
            errorDivText.innerHTML = xhr.response;
            errorDiv.style.display = 'block';
        }
    }
    xhr.open("POST", "../../php/signup.php");
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send("user=" + username.value + "&pass=" + password.value);
}

const getLeaderboard = () => {
    const xhrPlayers = new XMLHttpRequest();
    xhrPlayers.onload = () => {
        const response = JSON.parse(xhrPlayers.response);
        const leaderboard = document.getElementById("player-leaderboard");
        for (let row of response) {
            const newRow = leaderboard.insertRow();
            for (let key in row) {
                let newCell = newRow.insertCell();
                newCell.innerHTML = row[key];
            }
        }
    }
    xhrPlayers.open("GET", "../../php/get_players.php");
    xhrPlayers.send();

    const xhrGames = new XMLHttpRequest();
    xhrGames.onload = () => {
        const response = JSON.parse(xhrGames.response);
        const leaderboard = document.getElementById("game-leaderboard");
        for (let row of response) {
            const newRow = leaderboard.insertRow();
            for (let key in row) {
                let newCell = newRow.insertCell();
                newCell.innerHTML = row[key];
            }
        }
    }
    xhrGames.open("GET", "../../php/get_games.php");
    xhrGames.send();
}

const checkSession = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        console.log("Login check response: " + xhr.response);
        if (!xhr.response) {
            window.location.replace('../login/index.html');
        }
    }
    xhr.open("GET", "../../php/check_login.php");
    xhr.send();
}

const checkLogin = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        console.log("Already logged in: " + xhr.response);
        if (xhr.response) {
            window.location.replace('../game/index.html');
        }
    }
    xhr.open("GET", "../../php/check_login.php");
    xhr.send();
}