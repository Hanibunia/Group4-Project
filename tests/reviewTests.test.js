const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const sinon = require('sinon');
const { addReview, updateReview } = require('../utils/ReviewUtil');

describe('addReview', () => {
    const usersFilePath = 'utils/users.json';
    let orgContent = [];

    beforeEach(async () => {
        try {
            orgContent = await fs.readFile(usersFilePath, 'utf8');
            orgContent = JSON.parse(orgContent);
        } catch (error) {
            console.error('Error reading or parsing users file:', error);
        }
    });

    afterEach(async () => {
         await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
    });

    // Parameterized test cases for addReview
    const addReviewTestCases = [

        {
            name: 'Should register a new review successfully using an existing email',
            email: 'abc@gmail.com',
            reviewText: 'Great product!',
            rating: 5,
            expectedStatus: 201,
            expectedMessage: 'array',
        },
        {
            name: 'Should fail if user email has an invalid format',
            email: 'invalid_email_format',  // Invalid email format
            reviewText: 'Some review text',
            rating: 3,
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Invalid email format or missing fields' },
        }
        ,
        {
            name: 'Should fail if user email does not exist',
            email: 'nonexistent@gmail.com',
            reviewText: 'Bad product!',
            rating: 1,
            expectedStatus: 404,
            expectedMessage: { message: 'User not found' },
        },
        {
            name: 'Should fail if reviewText is empty',
            email: 'abc@gmail.com',
            reviewText: '',
            rating: 3,
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Invalid email format or missing fields' },
        },
        {
            name: 'Should fail if rating is not a number',
            email: 'abc@gmail.com',
            reviewText: 'Great product!',
            rating: 'not a number',
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Invalid email format or missing fields' },
        },

        {
            name: 'Should fail if reviewText exceeds the maximum length',
            email: 'abc@gmail.com',
            reviewText: 'a'.repeat(501), // Create a reviewText that exceeds the limit (e.g., 501 characters)
            rating: 4,
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Invalid email format or missing fields' },
        },
    ];

  // Loop through an array of test cases for the addReview function
addReviewTestCases.forEach((testCase) => {
    // Define a test case using the 'it' function
    it(testCase.name, async () => {
        // Mock request and response objects for testing purposes
        const req = {
            body: {
                email: testCase.email,
                reviewText: testCase.reviewText,
                rating: testCase.rating,
            },
        };

        const res = {
            // Define a 'status' method on the response object to check the HTTP status code
            status: function (code) {
                expect(code).to.equal(testCase.expectedStatus);
                return this;
            },
            // Define a 'json' method on the response object to check the JSON response
            json: function (data) {
                // Check if the expected message is a string
                if (typeof testCase.expectedMessage === 'string') {
                    expect(data).to.be.an(testCase.expectedMessage);
                } else {
                    expect(data).to.deep.equal(testCase.expectedMessage);
                }
            },
        };

        try {
            // Call the addReview function with the mock request and response objects
            await addReview(req, res);
        } catch (error) {
            console.error('Error during test execution:', error);
            throw error;
        } finally {
            // Restore any sinon stubs or spies after the test is executed
            sinon.restore();
        }
    });
});
});


describe('Update Review Function', () => {
    const reviewsFilePath = 'utils/reviews.json';
    let orgContent = [];

    beforeEach(async () => {
        try {
            orgContent = await fs.readFile(reviewsFilePath, 'utf8');
            orgContent = JSON.parse(orgContent);
        } catch (error) {
            console.error('Error reading or parsing reviews file:', error);
        }
    });

    afterEach(async () => {
        await fs.writeFile(reviewsFilePath, JSON.stringify(orgContent), 'utf8');
    });

    // Parameterized test cases for updateReview
    const updateReviewTestCases = [
        {
            name: 'Should update a review successfully',
            email: 'abc@gmail.com',
            reviewId: "07466bd9-648c-4967-82ba-3550c7577064",
            reviewText: 'Test',
            rating: 5,
            expectedStatus: 200,
            expectedResponse: {
                reviewId: "07466bd9-648c-4967-82ba-3550c7577064",
                email: 'abc@gmail.com',
                reviewText: 'Test',
                rating: 5
            },
        },
        {
            name: 'Should fail if review is not found',
            email: 'nonexistent@example.com',
            reviewId: '456',
            reviewText: 'Updated review text',
            rating: 5,
            expectedStatus: 404,
            expectedMessage: { message: 'Review not found for the user' },
        },
        {
            name: 'Should fail if reviewId is empty',
            email: 'abc@gmail.com',
            reviewId: '',
            reviewText: 'Updated review text',
            rating: 5,
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Missing fields' },
        },
        {
            name: 'Should fail if rating is not a number (update)',
            email: 'abc@gmail.com',
            reviewId: '8b0ad59c-b41f-49d6-9a0d-5faaeccbdc87',
            reviewText: 'Updated review text',
            rating: 'not a number',
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Missing fields' },
        },
        {
            name: 'Should fail if some fields are missing when updating a review',
            email: 'abc@gmail.com',
            reviewId: '8b0ad59c-b41f-49d6-9a0d-5faaeccbdc87',
            // Omit either reviewText or rating or both
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Missing fields' },
        },
        {
            name: 'Should fail if rating is out of range when updating a review',
            email: 'abc@gmail.com',
            reviewId: '8b0ad59c-b41f-49d6-9a0d-5faaeccbdc87',
            reviewText: 'Updated review text',
            rating: 6,
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Missing fields' },
        },
        {
            name: 'Should fail if review text exceeds length limit when updating a review',
            email: 'abc@gmail.com',
            reviewId: '8b0ad59c-b41f-49d6-9a0d-5faaeccbdc87',
            // Create a reviewText that exceeds the limit (e.g., 501 characters)
            reviewText: 'a'.repeat(501),
            rating: 4,
            expectedStatus: 400,
            expectedMessage: { message: 'Invalid data: Missing fields' },
        },




    ];

    updateReviewTestCases.forEach((testCase) => {
        it(testCase.name, async () => {
            // Mock request and response objects
            const req = {
                body: {
                    email: testCase.email,
                    reviewId: testCase.reviewId,
                    reviewText: testCase.reviewText,
                    rating: testCase.rating,
                },
            };
            const res = {
                status: function (code) {
                    expect(code).to.equal(testCase.expectedStatus);
                    return this;
                },
                json: function (data) {
                    if (testCase.expectedResponse) {
                        expect(data).to.deep.equal(testCase.expectedResponse);
                    } else {
                        expect(data).to.deep.equal(testCase.expectedMessage);
                    }
                },
            };

            try {
                await updateReview(req, res);
            } catch (error) {
                console.error('Error during test execution:', error);
                throw error;
            } finally {
                sinon.restore();
            }
        });
    });
});


