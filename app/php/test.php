<?php
$serverName = "mssql_db";
$connectionOptions = array(
    "Database" => "master",
    "Uid" => "SA",
    "PWD" => "SuperSecurePW1!",
    "TrustServerCertificate" => true
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$databaseName = "NewDatabase";

$sql = "CREATE DATABASE $databaseName";
$query = sqlsrv_query($conn, $sql);

if ($query === false) {
    die(print_r(sqlsrv_errors(), true));
}

echo "Database '$databaseName' created successfully.";

sqlsrv_close($conn);
?>
