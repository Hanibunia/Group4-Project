const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const sinon = require('sinon'); // Import sinon
const bcrypt = require('bcrypt'); // Import bcrypt
const { register, login } = require('../utils/UserUtil');

const usersFilePath = 'utils/users.json';
let orgContent = [];

describe('Testing Register Function', () => {
    const usersFilePath = 'utils/users.json';
    let orgContent = [];

    beforeEach(async () => {
        try {
            orgContent = await fs.readFile(usersFilePath, 'utf8');
            orgContent = JSON.parse(orgContent);
            console.log('Before test 1st:', orgContent);
        } catch (error) {
            console.error('Error reading or parsing users file:', error);
            // You might want to throw the error or handle it appropriately based on your needs
        }
    });
    

    afterEach(async () => {
        console.log('After test  1st:', orgContent);
        await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it('Should register a new user successfully', async () => {
const testUserEmail = `unique_email_${Date.now()}@example.com`;

    const req = {
        body: {
            email: testUserEmail,
            password: '123456',
        },
    };
    const res = {
        status: function (code) {
            console.log('Response status code:', code);
            expect(code).to.equal(201);
            return this;
        },
        json: function (data) {
            console.log('Response data:', data); // Log the entire response data for debugging

            // Add a check for data existence before performing assertions
            if (data) {
                // Expectations for the response data
                expect(data).to.have.lengthOf(orgContent.length + 1);
                const newUser = data[orgContent.length];
                expect(newUser.email).to.equal(req.body.email);
                // Adjust this expectation to check if the password is not the original password
                expect(newUser.password).to.not.equal('123456');
            } else {
                // Log a warning if data is undefined
                console.warn('Response data is undefined.');
            }
        },
    };

    await register(req, res);
});
});
it('Should shows validation error due to email', async () => {
    const req = {
        body: {
            email: 'simon#gmail.com',
            password: '123',
        },
    };
    const res = {
        status: function (code) {
            expect(code).to.equal(500);
            return this;
        },
        json: function (data) {
            expect(data.message).to.equal('Validation error');
        },
    };
    await register(req, res);
});

it('Should shows validation error due to password length', async () => {
    const req = {
        body: {
            email: 'simon@gmail.com',
            password: '123',
        },
    };
    const res = {
        status: function (code) {
            expect(code).to.equal(500);
            return this;
        },
        json: function (data) {
            expect(data.message).to.equal('Validation error');
        },
    };
    await register(req, res);
});
it('Should not register a user if email already exists', async () => {
    const existingEmail = 'unique_email_1700060061400@example.com';

    const req = {
        body: {
            email: existingEmail,
            password: 'newpassword123',
        },
    };
    const res = {
        status: function (code) {
            expect(code).to.equal(400);  
            return this;
        },
        json: function (data) {
            expect(data.message).to.equal('Email already exists');
            console.log('Response data message:', data.message);

        },
    };

    try {
        await register(req, res);
    } catch (error) {
        console.error('Error during test execution:', error);
        throw error;
    }

    // Update orgContent with the modified data after the test
    orgContent = await fs.readFile(usersFilePath, 'utf8');
    orgContent = JSON.parse(orgContent);
    console.log('After test - orgContent:', orgContent);
});
