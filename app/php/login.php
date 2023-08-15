<?php 

require 'set_conn_options.php';

session_start();

$_SESSION['valid'] = false;

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
    die("Login request failed.");
}
if ( $row = sqlsrv_fetch_array( $user_stmt, SQLSRV_FETCH_ASSOC) )
{
    if ($row['passwd'] === $pass) {
        $_SESSION['valid'] = true;
        $_SESSION['user'] = $user;
        echo "success";
    }
    else {
        die("Incorrect password.");
    }
}
else {
    die("Login request failed.");
}

/* Free the statement and connection resources. */
sqlsrv_free_stmt($user_stmt);
sqlsrv_close($conn);

?>