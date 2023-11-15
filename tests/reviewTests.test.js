const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const sinon = require('sinon'); // Import sinon
const { addReview} = require('../utils/ReviewUtil');

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
    });
    it('Should register a new review successfully using an existing email', async () => {
        const existingUserEmail = 'abc@gmail.com';

        // Mock request and response objects
        const req = {
            body: {
                userEmail: existingUserEmail,
                reviewText: 'Great product!',
                rating: 5,
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                // Assuming the response includes the reviews for the user
                expect(data).to.be.an('array');
                expect(data.length).to.be.greaterThan(0);
            },
        };
        try {
            await addReview(req, res);
        } catch (error) {
            console.error('Error during test execution:', error);
            throw error;
        } finally {
            // Restore the original behavior of readJSON after the test
            sinon.restore();
        }
    });
}); 
it('Should fail if user email does not exist', async () => {
    const nonExistingUserEmail = 'nonexistent@gmail.com';

    const req = {
        body: {
            userEmail: nonExistingUserEmail,
            reviewText: 'Bad product!',
            rating: 1,
        },
    };
    const res = {
        status: function (code) {
            expect(code).to.equal(404);
            return this;
        },
        json: function (data) {
            expect(data).to.deep.equal({ message: 'User not found' });
        },
    };

    try {
        await addReview(req, res);
    } catch (error) {
        console.error('Error during test execution:', error);
        throw error;
    } finally {
        sinon.restore();
    }
});


