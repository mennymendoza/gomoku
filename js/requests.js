
"use strict";

const login = () => {
    let username = document.getElementById("email-address");
    let password = document.getElementById("password");
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        console.log(xhr.response);
        if (xhr.response == 'correct') {
            window.location.replace("../game/index.html");
        }
    }
    xhr.open("POST", "../../php/login.php");
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send("user=" + username.value + "&pass=" + password.value);
}

const signup = () => {
    let username = document.getElementById("email-address");
    let password = document.getElementById("password");
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        console.log(xhr.response);
    }
    xhr.open("POST", "../../php/signup.php");
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send("user=" + username.value + "&pass=" + password.value);
}

const getGames = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const response = JSON.parse(xhr.response);
        const leaderboard = document.getElementById("leaderboard");
        for (let row of response) {
            const newRow = leaderboard.insertRow();
            for (let key in row) {
                let newCell = newRow.insertCell();
                newCell.innerHTML = row[key];
            }
        }
    }
    xhr.open("GET", "../../php/get_games.php");
    xhr.send();
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