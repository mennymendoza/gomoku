<?php

require 'set_credentials.php';

session_start();

# Class initialization
class Game {
    public $player_name;
    public $duration;
    public $number_of_turns;
}

# boilerplate mysql api code
$conn = new mysqli("localhost", $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error ."<br>");
}

$result = $conn->query("SELECT * FROM games WHERE player_name='{$_SESSION['user']}' LIMIT 40");
$response = array();

while ($row = $result->fetch_assoc()) {
    $curr = new Game;
    $curr->player_name = $row["player_name"];
    $curr->duration = $row["duration"];
    $curr->number_of_turns = $row["number_of_turns"];
    array_push($response, $curr);
}

echo json_encode($response);

$conn->close();


?>