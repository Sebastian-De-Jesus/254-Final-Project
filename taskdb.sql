-- - Users are stored in a table
-- - Each user has a Password, Email, and Unique Username
CREATE TABLE Users (
    Username VARCHAR(50) PRIMARY KEY,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL
);

-- - Tasks are stored in the "Tasks" table
-- - Each task has a Task Name, Completion Status, and Username
-- - The Username of Each Task is dictated by the User that Created I 
CREATE TABLE Tasks (
    TaskName VARCHAR(100) NOT NULL,
    CompletionStatus BOOLEAN NOT NULL,
    Username VARCHAR(50) NOT NULL,
    FOREIGN KEY (Username) REFERENCES Users(Username)
);
