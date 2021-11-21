
"use strict";

const login = () => {
    let username = document.getElementById("email-address");
    let password = document.getElementById("password");
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        console.log(xhr.response);
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