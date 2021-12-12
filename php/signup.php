<?php 

require 'set_credentials.php';

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
    die("No password found.");
}

// boilerplate mysql api code
$conn = new mysqli("localhost", $db_user, $db_pass, $db_name);
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
    $query_success = $conn->query("INSERT INTO players (usernm, passwd, games_won, time_played, games_played) VALUES ('${user}', '${pass}', 0, 0.0, 0)");
    if ($query_success) {
        echo "success";
    } else {
        echo "Hmmm... something went wrong on our end. Sorry!";
    }
}

$conn->close();

?>