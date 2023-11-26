const { User } = require('../models/User');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const saltRounds = 10; // The number of salt rounds to use (higher is more secure but slower)

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}


async function register(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email.includes('@') || !email.includes('.') || password.length < 6) {
            return res.status(500).json({ message: 'Validation error' });
        }

        const existingUsers = await readJSON('utils/users.json');

        // Check if the email already exists in the list of users
        const userExists = existingUsers.some(user => user.email === email);
        if (userExists) {

            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store the hashed password in the User object
        const newUser = new User(email, hashedPassword);

        // Write the newUser object with the hashed password to the JSON data store
        const updatedUsers = await writeJSON(newUser, 'utils/users.json');

        // Log the updated users for debugging
        //console.log('Updated Users:', updatedUsers);

        return res.status(201).json(updatedUsers);
    } catch (error) {
        // Log the error for debugging
        // console.error('Error in register function:', error);

        return res.status(500).json({ message: error.message });
    }
}
async function login(req, res) {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        const allUsers = await readJSON('utils/users.json');
        let validCredentials = false;

        for (let i = 0; i < allUsers.length; i++) {
            const currentUser = allUsers[i];

            if (currentUser.email === userEmail && currentUser.password === userPassword) {
                validCredentials = true;
                break;
            }
        }

        if (validCredentials) {
            return res.status(200).json({ message: 'Login successful!' });
        } else {
            return res.status(500).json({ message: 'Invalid credentials!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function updateEmail(req, res) {
    try {
        ////getting the old and new email
        const currentEmail = req.body.currentEmail;
        const newEmail = req.body.newEmail;

        //enhancing input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!currentEmail || !newEmail || !emailRegex.test(currentEmail) || !emailRegex.test(newEmail)) {
            return res.status(400).json({ message: 'Invalid data: Missing fields or invalid email format' });
        }
        //reading of file
        const allUsers = await readJSON('utils/users.json');

        //finding user by email
        const userIndex = allUsers.findIndex(user => user.email === currentEmail);

        //checking for user
        if (userIndex !== -1) {
            //updating of user email
            allUsers[userIndex].email = newEmail;

            //rewriting of file
            await writeJSON(allUsers, 'utils/users.json');

            res.status(200).json({ message: 'Email updated successfully' });
        } else {
            console.error('User not found');

            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
//test test
//test test 2

module.exports = {
    readJSON, writeJSON, register, login, updateEmail
};