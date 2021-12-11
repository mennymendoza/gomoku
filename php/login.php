<?php 

session_start();
$_SESSION['valid'] = false;

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
        $row = $result->fetch_assoc();
        if ($row["passwd"] == $pass) {
            echo "correct";
            $_SESSION['valid'] = true;
            $_SESSION['user'] = $user;
        }
        else {
            echo "That's not the correct password. Are you trying to be sneaky?";
        }
    }
} else {
    echo "Oops, something went wrong on our end. Sorry!";
}

$conn->close();

?>