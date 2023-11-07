const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const sinon = require('sinon'); // Import sinon
const bcrypt = require('bcrypt'); // Import bcrypt
const { register, login } = require('../utils/UserUtil');

describe('Testing Register Function', () => {
    const usersFilePath = 'utils/users.json';
    var orgContent = "";

    beforeEach(async () => {
        // Create a sinon stub for bcrypt.hash
        const hashStub = sinon.stub(bcrypt, 'hash');
        // Specify what the stub should return
        hashStub.returns('mockedHashedPassword');

        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(() => {
        // Restore the original bcrypt.hash function
        bcrypt.hash.restore();
    });

    it('Should register a new user successfully', async () => {
        const req = {
            body: {
                email: 'mary@gmail.com',
                password: '123456',
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data).to.have.lengthOf(orgContent.length + 1);
                expect(data[orgContent.length].email).to.equal(req.body.email);
                expect(data[orgContent.length].password).to.equal('mockedHashedPassword'); // Check the hashed password
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
});
