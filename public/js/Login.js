async function loginUser() {
    // Get user input values
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // Perform validation
    if (!email.includes('@') || password.length < 6) {
        alert('Invalid email or password (minimum 6 characters).');
        return;
    }

    // Prepare data for the backend
    var data = {
        email: email,
        password: password
    };

    try {
        // Make a POST request to the backend
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Parse the JSON response
        const result = await response.json();

        if (response.ok) {
           

            const userData = {
                email: email,
                // You can include other user-related information if needed
            };

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            // Change the "Login" link to "Logout" and bind the logout function
            const loginLink = document.getElementById('navUser');
            loginLink.innerHTML = '<a class="nav-link" href="#" onclick="logoutUser()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span> Logout</a>';

            // Close the login modal or redirect the user
            $('#loginForm').modal('hide');

            // Update the UI based on the login status
            checkLoggedIn();

           
        } else {
            // Failed login
            alert(result.message);
        }

    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
}

function checkLoggedIn() {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem('user'));

    // Show/hide the "Add Review" button based on the login status
    const addReviewButton = document.getElementById('addReviewButton');
    if (addReviewButton) {
        addReviewButton.style.display = user ? 'block' : 'none';
    }

    // Update the login/logout link
    const loginLink = document.getElementById('navUser');
    if (user) {
        // User is logged in, update the UI accordingly
        loginLink.innerHTML = '<a class="nav-link" href="#"  id="logout" onclick="logoutUser()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span> Logout</a>';
    } else {
        // User is not logged in, update the UI accordingly
        loginLink.innerHTML = '<a class="nav-link" href="#" data-toggle="modal" data-target="#loginForm" onclick="toggleLogin()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span> Login</a>';
    }
}


function toggleLogin() {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // User is logged in, initiate logout
        logoutUser();
    } else {
        // User is not logged in, open the login modal
        $('#loginForm').modal('show');
    }
}

function logoutUser() {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Hide the "Add Review" button
    const addReviewButton = document.getElementById('addReviewButton');
    if (addReviewButton) {
        addReviewButton.style.display = 'none';
    }

    // Change the "Logout" link back to "Login" and bind the login function
    const loginLink = document.getElementById('navUser');
    
    if (loginLink) {
        loginLink.innerHTML = '<a class="nav-link" href="#" data-toggle="modal" data-target="#loginForm" onclick="toggleLogin()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span> Login</a>';
    }



    // Optionally, display a logout message or update the UI
    alert('Logout successful');
}

// Check the login status when the page loads
checkLoggedIn();