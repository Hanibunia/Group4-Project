
async function loadRestaurants() {
    try {
        const response = await fetch('/viewRestaurant');
        const restaurants = await response.json();
        appendRestaurantsToContainer(restaurants);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
async function registerUser() {
    try {
        const email = document.getElementById('Email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Clear previous error messages
        document.getElementById('registerError').innerText = '';

        // Client-side validation
        if (!email.includes('@') || !email.includes('.') || password.length < 6) {
            document.getElementById('registerError').innerText = 'Invalid email or password (minimum 6 characters)';
            return; // Do not proceed if validation fails
        }

        // Additional check for password confirmation
        if (password !== confirmPassword) {
            document.getElementById('registerError').innerText = 'Password confirmation does not match';
            return; // Do not proceed if confirmation fails
        }

        // Send a request to your server to handle the registration
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Check the response status and handle accordingly
        if (response.ok) {
            const updatedUsers = await response.json();
            console.log('Registration successful. Updated Users:', updatedUsers);

            // Close the registration modal and open the login modal
            $('#registerForm').modal('hide');
            $('#loginForm').modal('show');
        } else {
            const errorData = await response.json();
            console.error('Registration error:', errorData.message);

            // Display the server-side error message
            document.getElementById('registerError').innerText = errorData.message;
        }
    } catch (error) {
        console.error('Error in registerUser function:', error);
    }
}

