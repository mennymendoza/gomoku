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

$user_exists = true;
$result = $conn->query("SELECT * FROM players WHERE usernm='${user}'");
if ($result) {
    if ($result->num_rows === 0) {
        $user_exists = false;
    }
    else {
        echo "That user already exists :C";
    }
} else {
    echo "Oops, something went wrong on our end. Sorry!";
}

if ($user_exists === false) {
    $query_success = $conn->query("INSERT INTO players (usernm, passwd) VALUES ('${user}', '${pass}')");
    if ($query_success) {
        echo "Thanks for signing up!";
    } else {
        echo "Hmmm... something went wrong on our end. Sorry!";
    }
}

$conn->close();

?>