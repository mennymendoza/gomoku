<?php
$serverName = "mssql_db";
$connectionOptions = array(
    "Database" => "master",
    "Uid" => "SA",
    "PWD" => "SuperSecurePW1!",
    "TrustServerCertificate" => true
);

// Connect to the SQL Server
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die("Connection failed: " . print_r(sqlsrv_errors(), true));
}

// Create a new database
$databaseName = "gomoku";
$createDatabaseQuery = "CREATE DATABASE $databaseName";
$createDatabaseResult = sqlsrv_query($conn, $createDatabaseQuery);

if ($createDatabaseResult === false) {
    die("Error creating database: " . print_r(sqlsrv_errors(), true));
}

echo "Database created successfully.<br>";

// Create a new user with all permissions
$newUser = "gomoku_user";
$newPassword = "SupersecurePW1!";
$createUserQuery = "USE $databaseName;
                    CREATE LOGIN $newUser WITH PASSWORD = '$newPassword';
                    USE $databaseName;
                    CREATE USER $newUser FOR LOGIN $newUser;
                    ALTER ROLE db_owner ADD MEMBER $newUser;";
$createUserResult = sqlsrv_query($conn, $createUserQuery);

if ($createUserResult === false) {
    die("Error creating user: " . print_r(sqlsrv_errors(), true));
}

echo "User created successfully with all permissions.<br>";

// Switch to the new database
sqlsrv_close($conn);
$connectionOptions["Database"] = $databaseName;
$newConn = sqlsrv_connect($serverName, $connectionOptions);

if ($newConn === false) {
    die("Connection to new database failed: " . print_r(sqlsrv_errors(), true));
}

// Create a new table
$createTableQuery = "CREATE TABLE games (
    id int IDENTITY (1,1) NOT NULL,
    player_name VARCHAR(max) NOT NULL,
    duration FLOAT NOT NULL,
    number_of_turns INT NOT NULL,
    CONSTRAINT PK_games_id PRIMARY KEY CLUSTERED (id)
    )";
$createTableResult = sqlsrv_query($newConn, $createTableQuery);

if ($createTableResult === false) {
    die("Error creating table: " . print_r(sqlsrv_errors(), true));
}

echo "Games table created successfully.<br>";

// Create a new table
$createTableQuery = "CREATE TABLE players (
    id int IDENTITY (1,1) NOT NULL,
    usernm VARCHAR(max) NOT NULL,
    passwd VARCHAR(max) NOT NULL,
    games_won INT NOT NULL,
    time_played FLOAT NOT NULL,
    games_played INT NOT NULL,
    CONSTRAINT PK_players_id PRIMARY KEY CLUSTERED (id)
    )";
$createTableResult = sqlsrv_query($newConn, $createTableQuery);

if ($createTableResult === false) {
    die("Error creating table: " . print_r(sqlsrv_errors(), true));
}

echo "Player table created successfully.<br>";

sqlsrv_close($newConn);
?>