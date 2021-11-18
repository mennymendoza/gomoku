<?php

# Connects to mysql database
$conn = mysqli("localhost", "juan", "password");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "<br />");
}
else {
    echo "Connected successfully.";
}

# Runs a query to create a database
$query_success = $conn->query("CREATE DATABASE games");

if ($query_success) {
    echo "Database created successfully.<br />";
}
else {
    echo "Error creating database: " . $conn->error . "<br />";
}

# Closes connection
$conn->close();

?>