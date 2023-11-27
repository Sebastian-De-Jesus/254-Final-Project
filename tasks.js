document.addEventListener("DOMContentLoaded", function () {
    // Get references to the relevant HTML elements
    const registerButton = document.getElementById("register");
    const submitButton = document.getElementById("submit");
    const goBackButton = document.getElementById("back");
    const loginButton = document.getElementById("login");
    const logoutButton = document.getElementById("logout");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const usernameInput = document.getElementById("username");
    const tasksList = document.getElementById("taskEntries");
    const taskMsg = document.getElementById("taskMsg");
    const emailField = document.getElementById("emailField");
    const passwordField = document.getElementById("passwordField");
    const taskNameInput = document.getElementById("taskName");
    const popUpContainer = document.getElementById("popUp");
    const popUpCloseButton = document.getElementById("popUpClose");
    const taskEntriesContainer = document.getElementById("taskEntries");
    const taskAddButton = document.getElementById("taskAdd");
    const insertButton = document.getElementById("insert");

    // Add a click event listener to the "Go Back" button
    goBackButton.addEventListener("click", function () {
        // Hide the Submit and Go Back buttons
        submitButton.style.display = "none";
        goBackButton.style.display = "none";

        // Show the Register and Login buttons
        registerButton.style.display = "block";
        loginButton.style.display = "block";

        // Hide the Email text input field
        emailInput.style.display = "none";
    });

    // Add a click event listener to the Register button
    registerButton.addEventListener("click", function () {
        // Hide the Register and Login buttons
        registerButton.style.display = "none";
        loginButton.style.display = "none";

        // Show the Submit and Go Back buttons
        submitButton.style.display = "block";
        goBackButton.style.display = "block";

        // Show the Email text input field
        emailField.style.display = "block";
    });

    // Add a click event listener to the "Submit" button
    submitButton.addEventListener("click", function () {
        // Check if there is a username, password, and email typed out
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const email = emailInput.value.trim();

        if (username === "" || password === "" || email === "") {
            // If any of the fields are empty, display an alert
            alert("Please fill out all fields (Username, Password, and Email).");
        } else {

            // Use AJAX to check if the username and email exist
            $.ajax({
                type: "POST", // Use "POST" request
                url: "http://localhost/taskq.php", // Replace with your PHP script URL
                data: {
                    action: "checkUserAndEmail", // Add a custom action to check username and email
                    username: username,
                    email: email
                },
                success: function (response) {
                    // Handle the response from the PHP script
                    if (response.existsUsername) {
                        alert("Username already exists. Please choose another.");
                    } else if (response.existsEmail) {
                        alert("Email already exists. Please use a different email.");
                    } else {
                        // If both username and email don't exist, proceed to insert the user
                        $.ajax({
                            type: "POST", // Use "POST" request
                            url: "http://localhost/taskq.php", // Replace with your PHP script URL
                            data: {
                                action: "insertUser", // Add a custom action to insert the user
                                username: username,
                                passwd: password,
                                email: email
                            },
                            success: function (insertResponse) {
                                // Handle the response from the user insertion
                                if (insertResponse.success) {
                                    // User insertion successful
                                    alert("Registration successful. You can now log in.");
                                    // Optionally, you can redirect to a login page or perform other actions.
                                } else {
                                    alert("Error inserting user. Please try again later.");
                                }
                            },
                            error: function (error) {
                                // Handle errors, if any
                                console.error(error);
                            }
                        });
                    }
                },
                error: function (error) {
                    // Handle errors, if any
                    console.error(error);
                }
            });

            // Hide the Submit and Go Back buttons
            submitButton.style.display = "none";
            goBackButton.style.display = "none";

            // Show the Register and Login buttons
            registerButton.style.display = "block";
            loginButton.style.display = "block";

            // Hide the Email text input field
            emailField.style.display = "none";
        }
    });

    // Define the Login function
    loginButton.addEventListener("click", function () {
        // Check if there is a username amd password are typed out
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const email = emailInput.value.trim();

        if (username === "" || password === "") {
            // If any of the fields are empty, display an alert
            alert("Please fill out all fields (Username and Password).");
        } else {
            // If all assertions are met:
            // Hide the Submit and Go Back buttons
            loginButton.style.display = "none";
            registerButton.style.display = "none";
            
            // Show the Tasks List 
            tasksList.style.display = "block";

            // Show the Logout button
            logoutButton.style.display = "block";

            // Hide the Email and Password text fields
            emailField.style.display = "none";
            passwordField.style.display = "none";

            // Keep the Username Value in the Username Field
            // Disable the Username field so that it cannot be overwritten
            usernameInput.value = username;
            usernameInput.disabled = true;

            // Show the Tasks List 
            tasksList.style.display = "block";
            taskMsg.style.display = "none";
        }
    });

    // Define the logout function
    logoutButton.addEventListener("click", function () {
        // Assert that usernameInput is disabled and not empty
        if (usernameInput.disabled && usernameInput.value.trim() !== "") {
            // Clear the values of Username, Password, and Email
            usernameInput.value = "";
            passwordInput.value = "";
            emailInput.value = "";

            // Re-enable UsernameInput
            usernameInput.disabled = false;

            // Show 'PasswordField'
            passwordField.style.display = "block";

            // Hide the Logout button
            logoutButton.style.display = "none";

            // Hide the Tasks List 
            tasksList.style.display = "none";
            taskMsg.style.display = "block";

            // Show the Login and Register buttons
            loginButton.style.display = "";
            registerButton.style.display = "";
        } else {
            alert("Assertion failed: usernameInput must be disabled and not empty.");
        }
    });
    
    // Add a click event listener to the "popUpClose" button
    popUpCloseButton.addEventListener("click", function () {
        // Clear any value stored in "taskName" input
        taskNameInput.value = "";

        // Hide the "popUp" container by setting its display property to "none"
        popUpContainer.style.display = "none";
    });

    // Add a click event listener to the "taskAdd" button
    taskAddButton.addEventListener("click", function () {
        // Get the value of the "taskName" input
        const taskName = taskNameInput.value.trim();

        // Check if the "taskName" input is not empty
        if (taskName !== "") {
            // Create a new task element with the specified format
            const newTaskElement = document.createElement("div");
            newTaskElement.classList.add("field-row");
            newTaskElement.innerHTML = `
                <input type="checkbox" id="${taskName}">
                <label for="${taskName}">${taskName}</label>
            `;

            // Add the newly-created task to the top of the "taskEntries" container
            taskEntriesContainer.insertBefore(newTaskElement, taskEntriesContainer.firstChild);

            // Clear the "taskName" input
            taskNameInput.value = "";

            // Hide the PopUp Container
            popUpContainer.style.display = "none";

        } else {
            // Display an alert if the "taskName" input is empty
            alert("Please enter a task name.");
        }
    });

    // Add a click event listener to the "insert" button
    insertButton.addEventListener("click", function () {
        // Clear the text stored in "taskName"
        taskNameInput.value = "";

        // Set the "popUp" container to display:block
        popUpContainer.style.display = "block";
    });

    // Stop Propagation on Popup
    popUpContainer.addEventListener("click", function (event) {
        event.stopPropagation();
    });

});
