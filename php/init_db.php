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

?>