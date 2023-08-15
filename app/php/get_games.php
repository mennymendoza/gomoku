<?php

require 'set_conn_options.php';

session_start();

# Class initialization
class Game {
    public $player_name;
    public $duration;
    public $number_of_turns;
}

// Connect to the SQL Server
$conn = sqlsrv_connect($server_name, $conn_options);

if ($conn === false) {
    die("Connection failed.");
}

// Get games that are associated with the session player
$games_query = "SELECT TOP(40) * FROM games WHERE player_name = ?";
$games_params = array($_SESSION['user']);

$games_stmt = sqlsrv_query($conn, $games_query, $games_params);
if( $games_stmt === false )
{
    die("Games request failed.");
}

$response = array();
while ( $row = sqlsrv_fetch_array( $games_stmt, SQLSRV_FETCH_ASSOC) )
{
    $curr = new Game;
    $curr->player_name = $row["player_name"];
    $curr->duration = $row["duration"];
    $curr->number_of_turns = $row["number_of_turns"];
    array_push($response, $curr);
}

echo json_encode($response);

/* Free the statement and connection resources. */
sqlsrv_free_stmt($games_stmt);
sqlsrv_close($conn);

?>