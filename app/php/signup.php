<?php 

require 'set_conn_options.php';

// Checking POST request parameters
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

// Connect to the SQL Server
$conn = sqlsrv_connect($server_name, $conn_options);

if ($conn === false) {
    die("Connection failed.");
}

// Checks to see if user exists
$user_query = "SELECT * FROM players WHERE usernm = ?";
$user_params = array($user);

$user_stmt = sqlsrv_query($conn, $user_query, $user_params);
if( $user_stmt === false )
{
    die("Sign up request failed.");
}
if ( $row = sqlsrv_fetch_array( $user_stmt, SQLSRV_FETCH_ASSOC) )
{
    die("User already exists.");
}

$insert_query = "INSERT INTO players (usernm, passwd, games_won, time_played, games_played) VALUES (?, ?, ?, ?, ?)";
$insert_params = array($user, $pass, 0, 0.0, 0);
/* Prepare the statement. */
if (!($insert_stmt = sqlsrv_prepare($conn, $insert_query, $insert_params))) {
    die("Sign up request failed.");
}

/* Execute the statement. */
if (sqlsrv_execute($insert_stmt)) {
    echo "success";
} else {
    die("Sign up request failed.");
}

/* Free the statement and connection resources. */
sqlsrv_free_stmt($user_stmt);
sqlsrv_free_stmt($insert_stmt);
sqlsrv_close($conn);

?>