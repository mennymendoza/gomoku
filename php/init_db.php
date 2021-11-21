<?php

# Connects to mysql database
$conn = new mysqli("localhost", "juan", "password");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "<br />");
}
else {
    echo "Connected successfully.<br />";
}

# Runs a query to create a database
$query_success = $conn->query("CREATE DATABASE gomoku");

if ($query_success) {
    echo "Database created successfully.<br />";
}
else {
    echo "Error creating database: " . $conn->error . "<br />";
}

# Closes connection
$conn->close();


# Connects to mysql database
$conn = new mysqli("localhost", "juan", "password", "gomoku");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "<br />");
}
else {
    echo "Connected successfully.<br />";
}

# Runs a query to create a database
$query_success = $conn->query("CREATE TABLE games (
    pkey INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(30) NOT NULL,
    score INT(10) NOT NULL,
    duration INT(20) NOT NULL,
    number_of_turns INT(10) NOT NULL
    )");

if ($query_success) {
    echo "Query successful.<br />";
}
else {
    echo "Query failed. " . $conn->error . "<br />";
}

# Runs a query to create a database
$query_success = $conn->query("CREATE TABLE players (
    pkey INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usernm VARCHAR(30),
    passwd VARCHAR(30)
    )");

if ($query_success) {
    echo "Query successful.<br />";
}
else {
    echo "Query failed. " . $conn->error . "<br />";
}

# Closes connection
$conn->close();

?>