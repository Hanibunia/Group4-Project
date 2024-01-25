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
                // Add any other headers as needed
            },
            body: JSON.stringify(data)
        });

        // Parse the JSON response
        const result = await response.json();

        // Check the result and take appropriate action
        if (response.ok) {
            // Successful login
            alert(result.message);
            // Close the login modal or redirect the user
            $('#loginForm').modal('hide');
            // You can add more logic here, such as redirecting the user to another page
            // or updating the UI to reflect the login state
        } else {
            // Failed login
            alert(result.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
}