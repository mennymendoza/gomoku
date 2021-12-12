<?php

require 'set_credentials.php';

# Connects to mysql database
$conn = new mysqli("localhost", 'root', '');

if ($conn->connect_error) {
    die("Database error: " . $conn->connect_error . "<br />");
}
else {
    echo "Database connected successfully.<br />";
}

# Runs a query to destroy the database
$query_success = $conn->query("DROP DATABASE gomoku");

if ($query_success) {
    echo "Query successful.<br />";
}
else {
    echo "Query failed. " . $conn->error . "<br />";
}

$conn->close();
# Closes connection
?>