const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const sinon = require('sinon');
const { addReview, updateReview } = require('../utils/ReviewUtil');

describe('Add Review Function', () => {
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
                userEmail: 'abc@gmail.com',
                reviewText: 'Great product!',
                rating: 5,
                expectedStatus: 201,
                expectedMessage: 'array',
            },
            {
                name: 'Should fail if user email does not exist',
                userEmail: 'nonexistent@gmail.com',
                reviewText: 'Bad product!',
                rating: 1,
                expectedStatus: 404,
                expectedMessage: { message: 'User not found' },
            },
            // Add more test cases as needed
        ];

        addReviewTestCases.forEach((testCase) => {
            it(testCase.name, async () => {
                // Mock request and response objects
                const req = {
                    body: {
                        userEmail: testCase.userEmail,
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
                        if (typeof testCase.expectedMessage === 'string') {
                            expect(data).to.be.an(testCase.expectedMessage);
                        } else {
                            expect(data).to.deep.equal(testCase.expectedMessage);
                        }
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
                userEmail: 'abc@gmail.com',
                reviewId: '8b0ad59c-b41f-49d6-9a0d-5faaeccbdc87',
                reviewText: 'Updated review text',
                rating: 5,
                expectedStatus: 200,
                expectedResponse: {
                    reviewId: '8b0ad59c-b41f-49d6-9a0d-5faaeccbdc87',
                    email: 'abc@gmail.com',
                    reviewText: 'Updated review text',
                    rating: 5
                },
            },
            {
                name: 'Should fail if review is not found',
                userEmail: 'nonexistent@example.com',
                reviewId: '456',
                reviewText: 'Updated review text',
                rating: 5,
                expectedStatus: 404,
                expectedMessage: { message: 'Review not found for the user' },
            },
            // Add more test cases as needed
        ];
    
        updateReviewTestCases.forEach((testCase) => {
            it(testCase.name, async () => {
                // Mock request and response objects
                const req = {
                    body: {
                        userEmail: testCase.userEmail,
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
});