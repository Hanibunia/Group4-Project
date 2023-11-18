const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const sinon = require('sinon'); // Import sinon
const bcrypt = require('bcrypt'); // Import bcrypt
const { register } = require('../utils/UserUtil');


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
        // await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
    });


    it('Should register a new user successfully with hashed password', async () => {
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
            json: async function (data) { // Add the async keyword here
                expect(data).to.have.lengthOf(orgContent.length + 1);
                const newUser = data[orgContent.length];
                expect(newUser.email).to.equal(req.body.email);

                // Access the hashed password
                const hashedPassword = newUser.password;

                // Perform assertions on the hashed password
                expect(await bcrypt.compare('123456', hashedPassword)).to.be.true;
            },
        };

        await register(req, res);
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
            console.error('Error during test execution:', error);
            throw error;
        }

    });

    // it('Should handle an error when bcrypt.hash fails', async () => {
    //     const req = {
    //         body: {
    //             email: 'test@example.com',
    //             password: 'password123',
    //         },
    //     };
    //     const res = {
    //         status: function (code) {
    //             expect(code).to.equal(500);
    //             return this;
    //         },
    //         json: function (data) {
    //             expect(data.message).to.equal('Internal server error');
    //         },
    //     };

    //     const hashStub = sinon.stub(bcrypt, 'hash').rejects(new Error('Hashing error'));
    //     await register(req, res);
    //     hashStub.restore();
    // });
});
