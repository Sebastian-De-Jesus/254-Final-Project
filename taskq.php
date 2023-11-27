<?php

// Connect to the Database
function connectToDatabase() {
    // Replace with your database connection details
    $host = "localhost"; // Database host
    $username = "your_db_username"; // Database username
    $password = "your_db_password"; // Database password
    $database = "your_db_name"; // Database name

    // Create a database connection
    $connection = mysqli_connect($host, $username, $password, $database);

    // Check if the connection was successful
    if (!$connection) {
        die("Database connection failed: " . mysqli_connect_error());
    }

    return $connection;
}

// Insert a User into the Database
function insertUser($username, $password, $email) {
    // Connect to the database
    $connection = connectToDatabase();

    // SQL query to insert the user data into the Users table
    $sql = "INSERT INTO Users (Username, Password, Email) VALUES ('$username', '$password', '$email')";

    // Execute the query
    if (mysqli_query($connection, $sql)) {
        // User insertion successful
        mysqli_close($connection);
        return true;
    } else {
        // User insertion failed
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return false;
    }
}

// Checks if a Given User Exists
function doesUsernameExist($username) {
    // Connect to the database
    $connection = connectToDatabase();

    // SQL query to check if the username exists in the Users table
    $sql = "SELECT Username FROM Users WHERE Username = '$username'";

    // Execute the query
    $result = mysqli_query($connection, $sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return false;
    }

    $row = mysqli_fetch_assoc($result);

    mysqli_free_result($result);
    mysqli_close($connection);

    // If a row was found, the username exists; otherwise, it does not exist
    return !empty($row);
}

// Checks if a Given Email is Used Already
function doesEmailExist($email) {
    // Connect to the database
    $connection = connectToDatabase();

    // SQL query to check if the email exists in the Users table
    $sql = "SELECT Email FROM Users WHERE Email = '$email'";

    // Execute the query
    $result = mysqli_query($connection, $sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return false;
    }

    $row = mysqli_fetch_assoc($result);

    mysqli_free_result($result);
    mysqli_close($connection);

    // If a row was found, the email exists; otherwise, it does not exist
    return !empty($row);
}

// Checks if a Given User or Email Exists
function checkUserAndEmail($username, $email) {
    // Connect to the database
    $connection = connectToDatabase();

    // SQL query to check if the username exists in the Users table
    $usernameSql = "SELECT Username FROM Users WHERE Username = '$username'";

    // SQL query to check if the email exists in the Users table
    $emailSql = "SELECT Email FROM Users WHERE Email = '$email'";

    // Execute the queries
    $usernameResult = mysqli_query($connection, $usernameSql);
    $emailResult = mysqli_query($connection, $emailSql);

    if (!$usernameResult || !$emailResult) {
        echo "Error: " . $usernameSql . "<br>" . mysqli_error($connection);
        echo "Error: " . $emailSql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return false;
    }

    $usernameRow = mysqli_fetch_assoc($usernameResult);
    $emailRow = mysqli_fetch_assoc($emailResult);

    mysqli_free_result($usernameResult);
    mysqli_free_result($emailResult);
    mysqli_close($connection);

    // If a row was found for either username or email, it exists; otherwise, it does not exist
    return !empty($usernameRow) || !empty($emailRow);
}

// Asserts a Username and Password of a User
function verifyUser($username, $password) {
    // Connect to the database
    $connection = connectToDatabase();

    // SQL query to retrieve the user's stored password
    $sql = "SELECT Password FROM Users WHERE Username = '$username'";

    // Execute the query
    $result = mysqli_query($connection, $sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return false;
    }

    $row = mysqli_fetch_assoc($result);

    mysqli_free_result($result);
    mysqli_close($connection);

    // Check if a row was found and if the provided password matches the stored password
    if (!empty($row) && password_verify($password, $row["Password"])) {
        return true;
    }

    return false;
}

// Gets the Incomplete Tasks Associated with a Specific User
function getIncompleteTasks($username) {
    // Connect to the database
    $connection = connectToDatabase();

    // SQL query to select incomplete tasks for the given username
    $sql = "SELECT TaskName FROM Tasks WHERE Username = '$username' AND CompletionStatus = 0";

    // Execute the query
    $result = mysqli_query($connection, $sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return null;
    }

    $incompleteTasks = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $incompleteTasks[] = $row["TaskName"];
    }

    mysqli_free_result($result);
    mysqli_close($connection);

    return $incompleteTasks;
}

// Gets the Complete Tasks Associated with a Specific User
function getCompleteTasks($username) {
    // Connect to the database
    $connection = connectToDatabase();

    // SQL query to select incomplete tasks for the given username
    $sql = "SELECT TaskName FROM Tasks WHERE Username = '$username' AND CompletionStatus = 0";

    // Execute the query
    $result = mysqli_query($connection, $sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return null;
    }

    $incompleteTasks = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $incompleteTasks[] = $row["TaskName"];
    }

    mysqli_free_result($result);
    mysqli_close($connection);

    return $incompleteTasks;
}

// Gets ALL of the Tasks Associated with a Specific User
function getAllTasks() {
    // Connect to the database
    $connection = connectToDatabase();

    // SQL query to select all tasks and their completion status
    $sql = "SELECT TaskName, CompletionStatus FROM Tasks";

    // Execute the query
    $result = mysqli_query($connection, $sql);

    if (!$result) {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
        mysqli_close($connection);
        return null;
    }

    $tasks = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $tasks[] = array(
            "TaskName" => $row["TaskName"],
            "CompletionStatus" => (bool) $row["CompletionStatus"]
        );
    }

    mysqli_free_result($result);
    mysqli_close($connection);

    return $tasks;
}

// Marks Tasks of a User as Complete
function markTasksAsComplete($username, $taskNames) {
    // Connect to the database
    $connection = connectToDatabase();

    // Prepare the task names for the SQL query
    $escapedTaskNames = array_map(function ($taskName) use($connection) {
        return mysqli_real_escape_string($connection, $taskName);
    }, $taskNames);

    // Create a comma-separated list of escaped task names
    $taskNameList = "'".implode("','", $escapedTaskNames). "'";

    // SQL query to update tasks to complete for the given username and task names
    $sql = "UPDATE Tasks SET CompletionStatus = 1 WHERE Username = '$username' AND CompletionStatus = 0 AND TaskName IN ($taskNameList)";

    // Execute the query
    if (mysqli_query($connection, $sql)) {
        // Tasks marked as complete successfully
        mysqli_close($connection);
        return true;
    } else {
    // Task update failed
    echo "Error: ".$sql. "<br>".mysqli_error($connection);
        mysqli_close($connection);
        return false;
    }
}

?>
