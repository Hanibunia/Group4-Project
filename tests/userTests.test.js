const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect, assert } = require('chai');  // Import assert from Chai
const fs = require('fs').promises;
const chai = require('chai');
const chaiHttp = require('chai-http');
const { readJSON, writeJSON } = require('../utils/UserUtil');
const sinon = require('sinon'); // Import sinon
const bcrypt = require('bcrypt'); // Import bcrypt
const { register, login, updateEmail } = require('../utils/UserUtil');
const saltRounds = 10; // The number of salt rounds to use (higher is more secure but slower)
chai.use(chaiHttp);

//Stub a simple fake object help write test 

describe('Testing Register Function', () => {
    const usersFilePath = 'utils/users.json';
    let orgContent = [];

    beforeEach(async () => {
        try {
            orgContent = await fs.readFile(usersFilePath, 'utf8');
            orgContent = JSON.parse(orgContent);
            //console.log('Before test 1st:', orgContent);
        } catch (error) {
            console.error('Error reading or parsing users file:', error);
            // You might want to throw the error or handle it appropriately based on your needs
        }
    });

    afterEach(async () => {
        // console.log('After test  1st:', orgContent);
        sinon.restore(); // Clean up the sinon mocks and stubs after each test
        await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
    });


  
    it('Should register a new user successfully with hashed password and spy on bcrypt.hash', async () => {
        const testUserEmail = `unique_email_${Date.now()}@example.com`;
    
        const req = {
            body: {
                email: testUserEmail,
                password: '123456',
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: async function (data) {
                expect(data).to.have.lengthOf(orgContent.length + 1);
                const newUser = data[orgContent.length];
                expect(newUser.email).to.equal(req.body.email);
    
                // Access the hashed password
                const hashedPassword = newUser.password;
    
                // Perform assertions on the hashed password
                expect(await bcrypt.compare('123456', hashedPassword)).to.be.true;
    
                // Verify that bcrypt.hash was called with the correct arguments
                console.log('Spy called with:', bcrypt.hash.args); // Add this line to log spy arguments
                assert(bcrypt.hash.calledWith('123456', saltRounds));
            },
        };
    
        // Spy on bcrypt.hash
        const bcryptHashSpy = sinon.spy(bcrypt, 'hash');
    
        await register(req, res);
    
        // Ensure that the spy is restored to its original state after the test
        bcryptHashSpy.restore();
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
        const existingEmail = 'abc@gmail.com';

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
            //console.error('Error during test execution:', error);
            throw error;
        }

    });

    //Testing a error using Stub 
    it('Should handle an error when bcrypt.hash fails', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Internal server error');
            },
        };

        // Stubbing bcrypt.hash
        const hashStub = sinon.stub(bcrypt, 'hash').rejects(new Error('Internal server error'));

        try {
            // Call the register function
            await register(req, res);
        } catch (error) {
            // Verify that the stubbed method was called
            assert(hashStub.called);
            // Restore the original 'bcrypt' library to avoid affecting other tests
            hashStub.restore();
            throw error;
        }
    });
});
describe('Testing Login Function', () => {
    const usersFilePath = 'utils/users.json';
    var orgContent = "";
    beforeEach(async () => {
        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });
    it('Should login successfully', async () => {
        const req = {
            body: {
                email: orgContent[0].email,
                password: orgContent[0].password,
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(200);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Login successful!');
            },
        };
        await login(req, res);
    });
    it('Should shows invalid credentials', async () => {
        const req = {
            body: {
                email: orgContent[0].email,
                password: 'abcdefg',
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Invalid credentials!');
            },
        };
        await login(req, res);
    });
});
describe('updateEmail', () => {
    beforeEach(async () => {
        // Create a test user and store it in the JSON file
        const testUser = {
            email: 'testuser@example.com',
        };
        await writeJSON([testUser], 'utils/users.json');
    });

    afterEach(async () => {
        // Clean up the test data after each test
        await writeJSON([], 'utils/users.json');
    });

    it('should update email for an existing user', async () => {
        // Assuming user ID 1 exists and the current email is 'testuser@example.com'
        const req = {
            params: {
                userId: 1,
            },
            body: {
                currentEmail: 'unique_email_1700665706293@example.com',
                newEmail: 'newemail@example.com',
            },
        };
    
        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.body = data;
                return this;
            },
        };
    
        await updateEmail(req, res);
    
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Email updated successfully');
    });
    it('should return a 404 status if the user is not found', async () => {
        const req = {
            body: {
                currentEmail: 'nonexistentuser@example.com',
                newEmail: 'newemail@example.com',
            },
        };

        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.body = data;
                return this;
            },
        };

        await updateEmail(req, res);

        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('User not found');
    });

    it('should return a 400 status for invalid data', async () => {
        const req = {
            body: {
                currentEmail: 'testuser@example.com',
                newEmail: 'invalidemail',
            },
        };

        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.body = data;
                return this;
            },
        };

        await updateEmail(req, res);

        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid data: Missing fields or invalid email format');
    });
});