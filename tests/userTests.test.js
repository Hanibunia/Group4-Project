const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect, assert } = require('chai');  // Import assert from Chai
const fs = require('fs').promises;
const sinon = require('sinon'); // Import sinon
const bcrypt = require('bcrypt'); // Import bcrypt
const { register } = require('../utils/UserUtil');
const saltRounds = 10; // The number of salt rounds to use (higher is more secure but slower)

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
        //await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
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