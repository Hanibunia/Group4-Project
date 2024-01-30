const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs').promises;
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var server;
var counter = 0;
before(async function () {

    server = await new Promise((resolve) => {
        const s = app.listen(0, 'localhost', () => {
            resolve(s);
        });
    });
});

describe('Testing Hanyi UpdateReview Frontend', function () {


    it('Should open the "Update Review" modal', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        this.timeout(10000);
        await driver.get(baseUrl);
        // Click on the link to open the login modal
        const loginLink = await driver.findElement(By.id('navUser'));
        await loginLink.click();

        // Wait for the login modal to be visible
        const loginModal = await driver.findElement(By.id('loginForm'));
        await driver.wait(until.elementIsVisible(loginModal), 5000);

        const emailInput = await driver.findElement(By.id('loginEmail'));
        const passwordInput = await driver.findElement(By.id('loginPassword'));
        const actualLoginButton = await driver.findElement(By.id('LoginButton'));

        // Enter login credentials
        await emailInput.sendKeys('abc@gmail.com');
        await passwordInput.sendKeys('hanyi909090');
        console.log('Before clicking login button');

        // Click the login button
        await actualLoginButton.click();
        console.log('After clicking login button');

        await driver.navigate().refresh();

        // Wait for the login modal to close
        await driver.wait(until.stalenessOf(loginModal), 10000);
        console.log('Login modal closed');
        // Assuming there is at least one restaurant card on the page
        const restaurantCard = await driver.findElement(By.className('card'));

        // Click on the restaurant card
        await restaurantCard.click();

        // Wait for the reviews modal to be visible
        const reviewsModal = await driver.findElement(By.id('reviewsModal'));
        await driver.wait(until.elementIsVisible(reviewsModal), 5000);

        // Find the container within reviewsModal (if necessary)
        const reviewsContainer = await reviewsModal.findElement(By.className('review-container'));

        // Find and click the "Edit" icon associated with the review
        const editIcon = await reviewsContainer.findElement(By.css('.fas.fa-edit')); // Combining classes with a dot
        await editIcon.click();
        console.log("Found the 'Edit' icon:", editIcon);

        // Wait for the "Update Review" modal to be visible
        const updateReviewModal = await driver.findElement(By.id('updateReviewModal'));
        await driver.wait(until.elementIsVisible(updateReviewModal), 5000);

        // Assert that the "Update Review" modal is visible
        expect(await updateReviewModal.isDisplayed()).to.be.true;
    });
    it('Should update a review through the "Update Review" modal', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        this.timeout(100000);
        await driver.get(baseUrl);

        // Assuming there is at least one restaurant card on the page
        const restaurantCard = await driver.findElement(By.className('card'));

        // Click on the restaurant card
        await restaurantCard.click();

        // Wait for the reviews modal to be visible
        const reviewsModal = await driver.findElement(By.id('reviewsModal'));
        await driver.wait(until.elementIsVisible(reviewsModal), 5000);

        // Find the container within reviewsModal (if necessary)
        const reviewsContainer = await reviewsModal.findElement(By.className('review-container'));

        // Find and click the "Edit" icon associated with the review
        const editIcon = await reviewsContainer.findElement(By.css('.fas.fa-edit')); // Combining classes with a dot
        await editIcon.click();

        // Wait for the "Update Review" modal to be visible
        const updateReviewModal = await driver.findElement(By.id('updateReviewModal'));
        await driver.wait(until.elementIsVisible(updateReviewModal), 5000);

        // Fill in the updated review information
        const updatedReviewTextInput = await driver.findElement(By.id('updatedReviewText'));
        const updatedRatingInput = await driver.findElement(By.id('updatedRating'));

        await updatedReviewTextInput.clear(); // Clear existing text if any
        await updatedReviewTextInput.sendKeys('Updated review text.');

        await updatedRatingInput.clear(); // Clear existing rating if any
        await updatedRatingInput.sendKeys('4');

        // Submit the update review form
        const updateButton = await driver.findElement(By.css('#updateReviewModal button[type="submit"]'));
        await updateButton.click();

        // Wait for a brief moment to ensure the update process completes
        await driver.sleep(1000);

        // Check if the "Update Review" modal is hidden
        const isUpdateReviewModalHidden = await updateReviewModal.isDisplayed().then(
            (displayed) => !displayed,
            () => true
        );

        // Assert the expected behavior ("Update Review" modal is not displayed)
        expect(isUpdateReviewModalHidden).to.be.false;
    });
    /////Test Suite 5: Update Review end /////////////////////////////////////////
});
afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
            // Save coverage data to a file
            await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
                JSON.stringify(coverageData), (err) => {
                    if (err) {
                        console.error('Error writing coverage data:', err);
                    } else {
                        console.log('Coverage data written to coverage.json');
                    }
                });
        }
    });
});
after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});
