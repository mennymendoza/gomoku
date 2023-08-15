<?php

$server_name = "mssql_db";
$db_user = "gomoku_user";
$db_pass = "SupersecurePW1!";
$db_name = "gomoku";

$conn_options = array(
    "Database" => $db_name,
    "Uid" => $db_user,
    "PWD" => $db_pass,
    "TrustServerCertificate" => true
);

?>