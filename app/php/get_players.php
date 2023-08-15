<?php

require 'set_conn_options.php';

session_start();

# Class initialization
class Player {
    public $usernm;
    public $games_won;
    public $time_played;
    public $games_played;
}

// Connect to the SQL Server
$conn = sqlsrv_connect($server_name, $conn_options);

if ($conn === false) {
    die("Connection failed.");
}

// Get games that are associated with the session player
$players_query = "SELECT TOP(10) * FROM players ORDER BY games_won DESC";
$players_params = array($_SESSION['user']);

$players_stmt = sqlsrv_query($conn, $players_query, $players_params);
if( $players_stmt === false )
{
    die("Games request failed.");
}

$response = array();
while ( $row = sqlsrv_fetch_array( $players_stmt, SQLSRV_FETCH_ASSOC) )
{
    $curr = new Player();
    $curr->usernm = $row["usernm"];
    $curr->games_won = $row["games_won"];
    $curr->time_played = $row["time_played"];
    $curr->games_played = $row["games_played"];
    array_push($response, $curr);
}

echo json_encode($response);

/* Free the statement and connection resources. */
sqlsrv_free_stmt($players_stmt);
sqlsrv_close($conn);

?>