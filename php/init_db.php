<?php

require 'set_credentials.php';

# Connects to mysql database
$conn = new mysqli("localhost", $db_user, $db_pass);

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

# Runs a query to create a user
$query_success = $conn->query("CREATE USER 'guest'@'localhost' IDENTIFIED BY 'root9';");

if ($query_success) {
    echo "User created successfully.<br>";
} else {
    echo "Error creating user: " . $conn->error . "<br>";
}

$query_success = $conn->query("GRANT SELECT, INSERT, UPDATE, DELETE ON * . * TO 'guest'@'localhost';");
if ($query_success) {
    echo "Permissions granted successfully<br>";
} else {
    echo "Error granting permissions: " . $conn->error . "<br>";
}

# Closes connection
$conn->close();


# Connects to mysql database
$conn = new mysqli("localhost", "root", "", "gomoku");

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
    duration FLOAT(20, 3) NOT NULL,
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
    usernm VARCHAR(30) NOT NULL,
    passwd VARCHAR(30) NOT NULL,
    games_won INT(6) NOT NULL,
    time_played FLOAT(20, 3) NOT NULL,
    games_played INT(6) NOT NULL
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