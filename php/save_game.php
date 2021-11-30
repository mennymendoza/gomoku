<?php 

session_start();

if (isset($_POST["score"])) {
    $score = $_POST["score"];
}
else {
    die("No score found.");
}

if (isset($_POST["duration"])) {
    $duration = $_POST["duration"];
}
else {
    die("No duration found.");
}


if (isset($_POST["num_turns"])) {
    $num_turns = $_POST["num_turns"];
}
else {
    die("No number of turns found.");
}

// boilerplate mysql api code
$conn = new mysqli("localhost", "guest", "root9", "gomoku");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query_success = $conn->query("INSERT INTO games (player_name, score, duration, number_of_turns) VALUES ('{$_SESSION['user']}', '${score}', '${duration}', '${num_turns}')");
if ($query_success) {
    echo "Game submission successful.";
} else {
    echo "Hmmm... something went wrong on our end. Sorry!";
    echo $conn->error;
}

$result = $conn->query("SELECT * FROM players WHERE usernm='{$_SESSION['user']}'");
if ($row = $result->fetch_assoc()) {
    $total_time_played = $row["time_played"];
    $total_time_played += $duration;
}
else {
    echo "Player not found. Could not update player score.";
}

$query_success = $conn->query("UPDATE players SET time_played={$total_time_played} WHERE usernm='{$_SESSION['user']}'");
if ($query_success) {
    echo "Player profile successfully updated.";
} else {
    echo "Hmmm... something went wrong on our end. Sorry!";
    echo $conn->error;
}


$conn->close();

?>