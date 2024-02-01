async function updateEmail() {
    var currentEmail = $('#currentEmail').val();
    var newEmail = $('#newEmail').val();

    try {
        await updateUserEmail(currentEmail, newEmail);
        // success msg
        
    } catch (error) {
        // error msg
        console.error('Failed to update email:', error.message);
    } finally {
        // closemodal
        $('#updateEmailModal').modal('hide');
    }
}

async function updateUserEmail(currentEmail, newEmail) {
    try {
        //updateUserEmail function
        const response = await fetch('/updateEmail', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentEmail,
                newEmail
            }),
        });

        //throw error if response is not ok
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || response.statusText);
        }

        // updating of email in localStorage
        let user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            // if user data exists
            user = { ...user, email: newEmail };
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            // if user data do not exists
            console.error('User data not found in localStorage.');
        }
    } catch (error) {
        throw new Error(`Failed to update user email: ${error.message}`);
    }
}