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

async function writeUpdate(object, filename) {
    try {
        const allObjects = await readJSON(filename);

        // Find the index of the object to update in the array
        const indexToUpdate = allObjects.findIndex(existingObject => existingObject.email === object.currentEmail);

        if (indexToUpdate !== -1) {
            // Update the existing object
            allObjects[indexToUpdate].email = object.newEmail || object.currentEmail; // Use newEmail if provided, otherwise use existing email
        } else {
            console.error('User not found');
            throw new Error('User not found');
        }

        // Write the updated data back to the JSON file
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) {
        console.error(err);
        throw err;
    }
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
        //getting email and password
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        //reading of user data
        const allUsers = await readJSON('utils/users.json');
        let validCredentials = false;

        //for loop all users to check
        for (let i = 0; i < allUsers.length; i++) {
            const currentUser = allUsers[i];

            //check if user and password match
            if (currentUser.email === userEmail && currentUser.password === userPassword) {
                validCredentials = true;
                break;
            }
        }

        //checking of results
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
        //getting current and new email
        const currentEmail = req.body.currentEmail;
        const newEmail = req.body.newEmail;

        //enchancing input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!currentEmail || !newEmail || !emailRegex.test(currentEmail) || !emailRegex.test(newEmail)) {
            return res.status(400).json({ message: 'Invalid data: Missing fields or invalid email format' });
        }

        //reading all user 
        const allUsers = await readJSON('utils/users.json');

        //finding user's email
        const userToUpdate = allUsers.find(user => user.email === currentEmail);

        //checking if user exists
        if (userToUpdate) {
            //updating of email
            await writeUpdate({ currentEmail, newEmail }, 'utils/users.json');

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


module.exports = {
    readJSON, writeJSON, register, login, updateEmail
};