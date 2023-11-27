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
            // If all assertions are met:
            // Hide the Submit and Go Back buttons
            submitButton.style.display = "none";
            goBackButton.style.display = "none";

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
});
