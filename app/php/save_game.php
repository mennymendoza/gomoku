<?php 

require 'set_conn_options.php';

session_start();

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

// Connect to the SQL Server
$conn = sqlsrv_connect($server_name, $conn_options);

if ($conn === false) {
    die("Connection failed.");
}

// Submits game into games table
$games_query = "INSERT INTO games (player_name, duration, number_of_turns) VALUES (?, ?, ?)";
$games_params = array($_SESSION['user'], $duration, $num_turns);

// Prepare the statement.
if (!($games_stmt = sqlsrv_prepare($conn, $games_query, $games_params))) {
    die("Save game failed.");
}

// Execute the statement.
if (sqlsrv_execute($games_stmt)) {
    echo "success";
} else {
    die("Save game failed.");
}

// Gets session user to update their data
$user_query = "SELECT * FROM players WHERE usernm = ?";
$user_params = array($_SESSION['user']);

$user_stmt = sqlsrv_query($conn, $user_query, $user_params);
if( $user_stmt === false )
{
    die("Save game request failed.");
}
if ( $row = sqlsrv_fetch_array( $user_stmt, SQLSRV_FETCH_ASSOC) )
{
    $total_time_played = $row["time_played"];
    $total_time_played += $duration;

    $total_games_won = $row["games_won"];
    $total_games_won += $game_won;
    echo "Games won: $total_games_won";

    $total_games_played = $row["games_played"];
    $total_games_played++;
}
else {
    die("Save game request failed.");
}

// Submits game into games table
$players_query = "UPDATE players SET games_won = ?, time_played = ?, games_played = ? WHERE usernm = ?";
$players_params = array($total_games_won, $total_time_played, $total_games_played, $_SESSION['user']);

// Prepare the statement.
if (!($players_stmt = sqlsrv_prepare($conn, $players_query, $players_params))) {
    die("Save game failed.");
}

// Execute the statement.
if (sqlsrv_execute($players_stmt)) {
    echo "success";
} else {
    die("Save game failed.");
}

/* Free the statement and connection resources. */
sqlsrv_free_stmt($games_stmt);
sqlsrv_free_stmt($user_stmt);
sqlsrv_free_stmt($players_stmt);
sqlsrv_close($conn);

?>