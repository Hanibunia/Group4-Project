const fs = require('fs').promises;
const { expect } = require('chai');
const chai = require('chai');

//importin of modules for testing
const { deleteReview } = require('../utils/ReviewUtil');

//creating of delete test suite
describe('deleteReview', () => {
    //defining path
    const reviewsFilePath = 'utils/reviews.json';
    //variable to store original content
    let orgContent = [];

    //setting up task before test
    beforeEach(async () => {
        try {
            //read and parse content
            orgContent = await fs.readFile(reviewsFilePath, 'utf8');
            orgContent = JSON.parse(orgContent);
        } catch (error) {
            //log of error message
            console.error('Error reading or parsing reviews file:', error);
        }
    });

    afterEach(async () => {
        // Delay for 1000 milliseconds (1 second)
        const delayMilliseconds = 1000;
    
        await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
    
        await fs.writeFile(reviewsFilePath, JSON.stringify(orgContent), 'utf8');
    });
    
    //setting up task after test
    describe('deleteReview', () => {
        //testing on delete review
        it('should delete a review', async () => {
            
            const req = {
                body: {
                    email: 'abc@gmail.com',
                    reviewId: '55dd3b12-683b-4b6d-9f17-ea9d22290527',
                },
            };

            //status and json functions
            const res = {
                status: function (code) {
                    //making sure status is 200
                    expect(code).to.equal(200);
                    return this;
                },
                json: function (data) {

                    expect(data).to.deep.equal({ message: 'Review has been successfully deleted' });
                },
            };
            //calling the deletereview function
            await deleteReview(req, res);
        });
        //when review is not found
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
            //calling deletereview
            await deleteReview(req, res);
        });
    });
});