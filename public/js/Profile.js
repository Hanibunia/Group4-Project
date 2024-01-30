async function updateEmail() {
    var currentEmail = $('#currentEmail').val();
    var newEmail = $('#newEmail').val();

    try {
        await updateUserEmail(currentEmail, newEmail);
        // Provide success feedback to the user in the UI (e.g., display a success message)
        console.log('Email updated successfully!');
    } catch (error) {
        // Provide error feedback to the user in the UI (e.g., display an error message)
        console.error('Failed to update email:', error.message);
    } finally {
        // Close the modal regardless of success or failure
        $('#updateEmailModal').modal('hide');
    }
}

async function updateUserEmail(currentEmail, newEmail) {
    try {
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

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || response.statusText);
        }

        // Update the email in the user data in localStorage
        let user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            user = { ...user, email: newEmail };
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            console.error('User data not found in localStorage.');
        }
    } catch (error) {
        throw new Error(`Failed to update user email: ${error.message}`);
    }
}