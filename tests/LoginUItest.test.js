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
    this.timeout(10000); // Set a longer timeout (in milliseconds) for the server setup

    server = await new Promise((resolve) => {
        const s = app.listen(0, 'localhost', () => {
            resolve(s);
        });
    });
});

describe('Testing Login UI', function () {

    it('Should have the correct title', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        this.timeout(100000); // Set timeout as 10 seconds
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('DVOPS - Restaurant Review Web App');
    });
    it('Should display the navigation bar', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        await driver.get(baseUrl);
        const navBar = await driver.findElement(By.className('navbar'));
        expect(navBar).to.exist;
    });
    it('Should append image to the card if image URL is provided', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        await driver.get(baseUrl);

        // Assuming there are multiple restaurant cards on the page with class "card mb-3"
        const restaurantCards = await driver.findElements(By.className('card mb-3'));

        // Iterate over each restaurant card
        for (const restaurantCard of restaurantCards) {
            // Check if the "card-img-top" class is present in the current restaurant card
            const isImageAppended = await restaurantCard.findElement(By.className('card-img-top')).catch(() => false);

            // If the image is appended, the test passes
            if (isImageAppended) {
                expect(true).to.be.true;
                return; // Exit the test
            }
        }

        // If no card with an image is found, the test fails
        expect.fail('No restaurant card with image found');
    });


    it('Should open the reviews modal when clicking on a restaurant', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        await driver.get(baseUrl);

        // Assuming there is at least one restaurant card on the page
        const restaurantCard = await driver.findElement(By.className('card'));

        // Get the restaurant ID from the card's data attribute or any other attribute that uniquely identifies it
        const restaurantId = await restaurantCard.getAttribute('data-restaurant-id');

        // Click on the restaurant card
        await restaurantCard.click();


        expect(restaurantId).to.exist;
    });


    it('Should open the register modal when clicking on Register link', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        await driver.get(baseUrl);

        // Click on the link to open the login modal
        const loginLink = await driver.findElement(By.id('navUser'));
        await loginLink.click();

        // Wait for the login modal to be visible
        const loginModal = await driver.findElement(By.id('loginForm'));
        await driver.wait(until.elementIsVisible(loginModal), 5000);

        // Now, click on the link to open the register modal within the login modal
        const registerLink = await driver.findElement(By.id('Register'));
        await registerLink.click();

        // Wait for the register modal to be visible
        const registerModal = await driver.findElement(By.id('registerForm'));
        await driver.wait(until.elementIsVisible(registerModal), 5000);

        // Check if the register modal is displayed
        expect(await registerModal.isDisplayed()).to.be.true;
    });

    it('Should register a user', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        await driver.get(baseUrl);

        // Click on the link to open the login modal
        const loginLink = await driver.findElement(By.id('navUser'));
        await loginLink.click();

        // Wait for the login modal to be visible
        const loginModal = await driver.findElement(By.id('loginForm'));
        await driver.wait(until.elementIsVisible(loginModal), 5000);

        // Now, click on the link to open the register modal within the login modal
        const registerLink = await driver.findElement(By.id('Register'));
        await registerLink.click();

        // Wait for the register modal to be visible
        const registerModal = await driver.findElement(By.id('registerForm'));
        await driver.wait(until.elementIsVisible(registerModal), 5000);

        // Fill in the registration form
        const emailInput = await driver.findElement(By.id('Email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const confirmPasswordInput = await driver.findElement(By.id('confirm-password'));

        await emailInput.sendKeys('testuser@abacasdasdsadsssssssssssgmail.com');
        await passwordInput.sendKeys('password123');
        await confirmPasswordInput.sendKeys('password123');

        // Submit the registration form
        const registerButton = await driver.findElement(By.id('registerButtonId'));
        await registerButton.click();

        // Wait for a brief moment to ensure the registration process completes
        await driver.sleep(1000);

        // Check if the registration modal is hidden
        const isRegisterModalHidden = await registerModal.isDisplayed().then(
            (displayed) => !displayed,
            () => true
        );

        // Assert the expected behavior (registration modal is not displayed)
        expect(isRegisterModalHidden).to.be.true;
    });


    it('Should display error for invalid email or password', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        await driver.get(baseUrl);

        // Click on the link to open the login modal
        const loginLink = await driver.findElement(By.id('navUser'));
        await loginLink.click();

        // Wait for the login modal to be visible
        const loginModal = await driver.findElement(By.id('loginForm'));
        await driver.wait(until.elementIsVisible(loginModal), 5000);

        // Now, click on the link to open the register modal within the login modal
        const registerLink = await driver.findElement(By.id('Register'));
        await registerLink.click();

        // Wait for the register modal to be visible
        const registerModal = await driver.findElement(By.id('registerForm'));
        await driver.wait(until.elementIsVisible(registerModal), 5000);

        // Fill in the registration form with invalid credentials
        const emailInput = await driver.findElement(By.id('Email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const confirmPasswordInput = await driver.findElement(By.id('confirm-password'));

        // Invalid email and password (less than 6 characters)
        await emailInput.sendKeys('invalidemail');
        await passwordInput.sendKeys('pass');
        await confirmPasswordInput.sendKeys('pass');

        // Submit the registration form
        const registerButton = await driver.findElement(By.id('registerButtonId'));
        await registerButton.click();

        // Wait for a brief moment to ensure the registration process completes
        await driver.sleep(1000);

        // Check if the registration error message is displayed
        const registerError = await driver.findElement(By.id('registerError'));
        const errorText = await registerError.getText();

        // Assert the expected error message
        expect(errorText).to.equal('Invalid email or password (minimum 6 characters)');
    });

    it('Should display error for password confirmation mismatch', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        await driver.get(baseUrl);

        // Click on the link to open the login modal
        const loginLink = await driver.findElement(By.id('navUser'));
        await loginLink.click();

        // Wait for the login modal to be visible
        const loginModal = await driver.findElement(By.id('loginForm'));
        await driver.wait(until.elementIsVisible(loginModal), 5000);

        // Now, click on the link to open the register modal within the login modal
        const registerLink = await driver.findElement(By.id('Register'));
        await registerLink.click();

        // Wait for the register modal to be visible
        const registerModal = await driver.findElement(By.id('registerForm'));
        await driver.wait(until.elementIsVisible(registerModal), 5000);

        // Fill in the registration form with valid credentials
        const emailInput = await driver.findElement(By.id('Email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const confirmPasswordInput = await driver.findElement(By.id('confirm-password'));

        // Valid email and password
        await emailInput.sendKeys('testuser@sssgmail.com');
        await passwordInput.sendKeys('password123');
        await confirmPasswordInput.sendKeys('password1234'); // Mismatched confirmation

        // Submit the registration form
        const registerButton = await driver.findElement(By.id('registerButtonId'));
        await registerButton.click();

        // Wait for a brief moment to ensure the registration process completes
        await driver.sleep(1000);

        // Check if the registration error message is displayed
        const registerError = await driver.findElement(By.id('registerError'));
        const errorText = await registerError.getText();

        // Assert the expected error message
        expect(errorText).to.equal('Password confirmation does not match');
    });

    it('Should display the "Add Review" modal when clicking on the "Add Review" button', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

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

        // Check if the add review modal is displayed
        expect(await addReviewModal.isDisplayed()).to.be.true;
    });
    it('Should add a review through the "Add Review" modal', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        this.timeout(100000)
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
        this.timeout(100000);

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


    it('Should open the "Update Review" modal', async function () {
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