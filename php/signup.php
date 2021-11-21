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

$sql = "INSERT INTO players (usernm, passwd) VALUES ('${user}', '${pass}')";
if ($conn->query($sql) === TRUE) {
    echo "Thanks for signing up!";
} else {
    echo "Hmmm... something went wrong on our end. Sorry!";
}

$conn->close();

?>