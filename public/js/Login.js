async function loginUser() {
    // getting user inputs
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // validation
    if (!email.includes('@') || password.length < 6) {
        alert('Invalid email or password (minimum 6 characters).');
        return;
    }

    // calling data
    var data = {
        email: email,
        password: password
    };

    try {
        // POST to backend
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // parse
        const result = await response.json();

        if (response.ok) {
           

            const userData = {
                email: email,
                
            };

            // user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            // login function
            const loginLink = document.getElementById('navUser');
            loginLink.innerHTML = '<a class="nav-link" href="#" onclick="logoutUser()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span> Logout</a>';

            // closing login modal
            $('#loginForm').modal('hide');

            
            checkLoggedIn();

            window.location.reload();
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
    // checkin if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));

    // show or hide base on login status
    const addReviewButton = document.getElementById('addReviewButton');
    if (addReviewButton) {
        addReviewButton.style.display = user ? 'block' : 'none';
    }

    // update of ui
    const loginLink = document.getElementById('navUser');
    if (user) {
        // if user is logged in
        loginLink.innerHTML = '<a class="nav-link" href="#"  id="logout" onclick="logoutUser()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span> Logout</a>';
    } else {
        // if user is not logged in
        loginLink.innerHTML = '<a class="nav-link" href="#" data-toggle="modal" data-target="#loginForm" onclick="toggleLogin()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span> Login</a>';
    }
}


function toggleLogin() {
    // check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // show logout
        logoutUser();
    } else {
        // show login modal
        $('#loginForm').modal('show');
    }
}

function logoutUser() {
    // removing
    localStorage.removeItem('user');

    // hiding of add review button
    const addReviewButton = document.getElementById('addReviewButton');
    if (addReviewButton) {
        addReviewButton.style.display = 'none';
    }

    // change logout back to login
    const loginLink = document.getElementById('navUser');
    
    if (loginLink) {
        loginLink.innerHTML = '<a class="nav-link" href="#" data-toggle="modal" data-target="#loginForm" onclick="toggleLogin()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span> Login</a>';
    }



    
    alert('Logout successful');
    window.location.reload();
}

// Check the login status when the page loads
checkLoggedIn();