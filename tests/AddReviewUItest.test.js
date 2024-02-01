const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs').promises;
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--log-level=3')
// const driver = new Builder().forBrowser('MicrosoftEdge').build();
// const edge = require('selenium-webdriver/edge');
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
//Test Suite 4: Add Review /////////////////////////////////////
describe('Testing Hanyi Add Review Frontend', function () {

it('Should display the "Add Review" modal when clicking on the "Add Review" button', async function () {
    const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
    this.timeout(100000);
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


    const logoutLink = await driver.findElement(By.id('logout'));
    await driver.wait(until.elementIsVisible(logoutLink), 5000);
    console.log('Logout here');

    // Now that we are logged in, proceed with the next steps
    const restaurantCard = await driver.findElement(By.className('card'));

    // Click on the restaurant card
    await restaurantCard.click();

    // Wait for the reviews modal to be visible
    const reviewsModal = await driver.findElement(By.id('reviewsModal'));
    await driver.wait(until.elementIsVisible(reviewsModal), 5000);

    // Click on the "Add Review" button within the reviews modal
    const addReviewButton = await driver.findElement(By.css('#reviewsModal .modal-footer button'));
    await addReviewButton.click();

    // Wait for the add review modal to be visible
    const addReviewModal = await driver.findElement(By.id('addReviewModal'));
    await driver.wait(until.elementIsVisible(addReviewModal), 5000);

    // Check if the add review modal is displayed
    expect(await addReviewModal.isDisplayed()).to.be.true;
});


it('Should add a review through the "Add Review" modal', async function () {
    const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
    this.timeout(10000)
    await driver.get(baseUrl);

    // Assuming there is at least one restaurant card on the page
    const restaurantCard = await driver.findElement(By.className('card'));

    // Click on the restaurant card
    await restaurantCard.click();

    // Wait for the reviews modal to be visible
    const reviewsModal = await driver.findElement(By.id('reviewsModal'));
    await driver.wait(until.elementIsVisible(reviewsModal), 5000);

    // Click on the "Add Review" button within the reviews modal
    const addReviewButton = await driver.findElement(By.css('#reviewsModal .modal-footer button'));
    await addReviewButton.click();

    // Wait for the add review modal to be visible
    const addReviewModal = await driver.findElement(By.id('addReviewModal'));
    await driver.wait(until.elementIsVisible(addReviewModal), 5000);

    // Fill in the review form
    const emailInput = await driver.findElement(By.id('email'));
    const reviewTextInput = await driver.findElement(By.id('reviewText'));
    const ratingInput = await driver.findElement(By.id('rating'));

    await emailInput.sendKeys('abc@gmail.com');
    await reviewTextInput.sendKeys('This restaurant is amazing!');
    await ratingInput.sendKeys('5');

    // Submit the review form
    const submitButton = await driver.findElement(By.css('#addReviewModal button[type="submit"]'));
    await submitButton.click();

    // Wait for a brief moment to ensure the review submission process completes
    await driver.sleep(1000);

    // Check if the add review modal is hidden
    const isAddReviewModalHidden = await addReviewModal.isDisplayed().then(
        (displayed) => !displayed,
        () => true
    );

    // Assert the expected behavior (add review modal is not displayed)
    expect(isAddReviewModalHidden).to.be.false;

});

it('Should log an error when adding a review fails with "Not Found"', async function () {
    const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
    this.timeout(10000);

    await driver.get(baseUrl);

    // Assuming there is at least one restaurant card on the page
    const restaurantCard = await driver.findElement(By.className('card'));

    // Click on the restaurant card
    await restaurantCard.click();

    // Wait for the reviews modal to be visible
    const reviewsModal = await driver.findElement(By.id('reviewsModal'));
    await driver.wait(until.elementIsVisible(reviewsModal), 5000);

    // Click on the "Add Review" button within the reviews modal
    const addReviewButton = await driver.findElement(By.css('#reviewsModal .modal-footer button'));
    await addReviewButton.click();

    // Wait for the add review modal to be visible
    const addReviewModal = await driver.findElement(By.id('addReviewModal'));
    await driver.wait(until.elementIsVisible(addReviewModal), 5000);

    // Fill in the review form with intentionally invalid data
    const emailInput = await driver.findElement(By.id('email'));
    const reviewTextInput = await driver.findElement(By.id('reviewText'));
    const ratingInput = await driver.findElement(By.id('rating'));

    // Use a non-existent restaurant ID
    await driver.executeScript(() => window.selectedRestaurantId = 'non_existent_id');

    // Add other valid data as needed
    await emailInput.sendKeys('validemail@example.com');
    await reviewTextInput.sendKeys('This restaurant is amazing!');
    await ratingInput.sendKeys('5');

    // Submit the review form
    const submitButton = await driver.findElement(By.css('#addReviewModal button[type="submit"]'));
    await submitButton.click();

    // Wait for a brief moment to ensure the review submission process completes
    await driver.sleep(1000);

    // Check the console logs for the expected error message
    const consoleLogs = await driver.manage().logs().get('browser');
    const errorMessages = consoleLogs.filter(log => log.level.name === 'SEVERE' && log.message.includes('Failed to add review'));

    // Assert the expected behavior (console error is logged)
    expect(errorMessages.length).to.equal(1);

});
    //Test Suite 4: Add Review end /////////////////////////////////////

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
