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

if (isset($_POST["game_won"])) {
    $game_won = $_POST["game_won"];
    echo "Game won: $game_won";
}
else {
    die("game_won not found.");
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

    $total_games_won = $row["games_won"];
    $total_games_won += $game_won;
    echo "Games won: $total_games_won";

    $total_games_played = $row["games_played"];
    $total_games_played++;
}
else {
    echo "Player not found. Could not update player score.";
}

$query_success = $conn->query("UPDATE players SET games_won={$total_games_won}, time_played={$total_time_played}, games_played={$total_games_played}  WHERE usernm='{$_SESSION['user']}'");
if ($query_success) {
    echo "Player profile successfully updated.";
} else {
    echo "Hmmm... something went wrong on our end. Sorry!";
    echo $conn->error;
}


$conn->close();

?>