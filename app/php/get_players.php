<?php

require 'set_credentials.php';

session_start();

# Class initialization
class Player {
    public $usernm;
    public $games_won;
    public $time_played;
    public $games_played;
}

# boilerplate mysql api code
$conn = new mysqli("localhost", $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error ."<br>");
}

$result = $conn->query("SELECT * FROM players ORDER BY games_won DESC LIMIT 10");
$response = array();

while ($row = $result->fetch_assoc()) {
    $curr = new Player;
    $curr->usernm = $row["usernm"];
    $curr->games_won = $row["games_won"];
    $curr->time_played = $row["time_played"];
    $curr->games_played = $row["games_played"];
    array_push($response, $curr);
}

echo json_encode($response);

$conn->close();


?>