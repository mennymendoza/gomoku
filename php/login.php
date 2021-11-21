<?php 

if (isset($_POST["user"])) {
    $user = $_POST["user"];
}
else {
    die("No username found.");
}

if (isset($_POST["pass"])) {
    $pass = $_POST["pass"];
}
else {
    die("No username found.");
}

// boilerplate mysql api code
$conn = new mysqli("localhost", "guest", "root9", "gomoku");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM players WHERE usernm='${user}'");
if ($result) {
    if ($result->num_rows === 0) {
        echo "Could not find anyone with that login.";
    }
    else {
        echo "We found you!";
    }
} else {
    echo "Oops, something went wrong on our end. Sorry!";
}

$conn->close();

?>