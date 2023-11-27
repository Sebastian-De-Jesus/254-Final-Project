function insertUser($username, $password, $email) {
    // Replace these with your database connection details
    $host = "localhost"; // Database host
    $dbUsername = "your_db_username"; // Database username
    $dbPassword = "your_db_password"; // Database password
    $dbName = "your_db_name"; // Database name

    // Create a database connection
    $connection = mysqli_connect($host, $dbUsername, $dbPassword, $dbName);

    // Check if the connection was successful
    if (!$connection) {
        die("Database connection failed: " . mysqli_connect_error());
    }

    // Insert the user data into the Users table
    $sql = "INSERT INTO Users (Username, Password, Email) VALUES ('$username', '$password', '$email')";
    
    if (mysqli_query($connection, $sql)) {
        // User registration successful
        mysqli_close($connection);
        return true;
    } else {
        // User registration failed
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return false;
    }
}