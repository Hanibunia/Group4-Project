const fs = require('fs').promises;
const { expect } = require('chai');
const chai = require('chai');

// Import your module
const { deleteReview } = require('../utils/ReviewUtil');

describe('deleteReview', () => {

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

    describe('deleteReview', () => {
        it('should delete a review', async () => {
            const req = {
                body: {
                    email: 'abc@gmail.com',
                    reviewId: '7d1ff924-3d62-42d5-a27f-d42119659ce5',
                },
            };

            const res = {
                status: function (code) {
                    expect(code).to.equal(200);
                    return this;
                },
                json: function (data) {
                    expect(data).to.deep.equal({ message: 'Review has been successfully deleted' });
                },
            };

            await deleteReview(req, res);
        });

        it('should handle the case when the review is not found', async () => {
            const req = {
                body: {
                    email: 'user@example.com',
                    reviewId: 'nonexistentReviewId',
                },
            };

            const res = {
                status: function (code) {
                    expect(code).to.equal(500);
                    return this;
                },
                json: function (data) {
                    expect(data).to.deep.equal({ message: 'Internal server error' });
                },
            };

            await deleteReview(req, res);
        });
    });
});