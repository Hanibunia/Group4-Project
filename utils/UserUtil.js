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
            return res.status(400).json({ message: 'Validation error' });
        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Store the hashed password in the User object
            const newUser = new User(email, hashedPassword);

            // Write the newUser object with the hashed password to the JSON data store
            const updatedUsers = await writeJSON(newUser, 'utils/users.json');
            return res.status(201).json(updatedUsers);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, register
};