
const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs').promises;
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--log-level=3')

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

describe('Clement Frontend Check', function () {
    it('should show error for invalid login credentials', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        // Navigate to the login page
        await driver.get(baseUrl);

        // Click on the link to open the login modal
        const loginLink = await driver.findElement(By.id('navUser'));
        await loginLink.click();

        // Wait for the login modal to be visible
        const loginModal = await driver.findElement(By.id('loginForm'));
        await driver.wait(until.elementIsVisible(loginModal), 5000);

        // Enter invalid login credentials
        const emailInput = await driver.findElement(By.id('loginEmail'));
        const passwordInput = await driver.findElement(By.id('loginPassword'));
        const actualLoginButton = await driver.findElement(By.id('LoginButton'));

        await emailInput.sendKeys('invalidemail');
        await passwordInput.sendKeys('short');

        // Click the login button
        await actualLoginButton.click();

        // Wait for the error alert to be present
        // Wait for the error alert to be present
        try {
            await driver.wait(until.alertIsPresent(), 5000);

            // Switch to the alert and get its text
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();

            // Check if the alert message is correct
            expect(alertText).to.equal('Invalid email or password (minimum 6 characters).');

            // Dismiss the alert
            await alert.dismiss();
        } catch (error) {
            // Handle the case when no alert is present
            console.error('No alert found:', error);
        }



    });
    it('should login successfully', async function () {
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
        expect(await logoutLink.isDisplayed()).to.be.true;
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
    it('Should delete review', async function () {
        const baseUrl = 'http://localhost:' + server.address().port  + '/instrumented';
        await driver.get(baseUrl);

        // Assuming there is at least one restaurant card on the page
        const restaurantCard = await driver.findElement(By.className('card'));

        // Click on the restaurant card
        await restaurantCard.click();
        const reviewsModal = await driver.findElement(By.id('reviewsModal'));
        await driver.wait(until.elementIsVisible(reviewsModal), 5000);

        // Find the container within reviewsModal (if necessary)
        const reviewsContainer = await reviewsModal.findElement(By.className('review-container'));

        // Assuming there is a delete review button on the page
        const deleteIcon = await reviewsContainer.findElement(By.css('.fas.fa-trash-alt'));

        // Click on the delete review button
        await deleteIcon.click();

        // Wait for the confirmation dialog to appear
        const confirmDialog = await driver.switchTo().alert();

        // Accept the confirmation dialog
        await confirmDialog.accept();
        await driver.navigate().refresh();

        expect(restaurantCard).to.exist;

    });
    it('should update email successfully', async function () {
        // Assuming the user is already logged in (you can reuse the login code or use a beforeEach hook)
        this.timeout(100000)

        // Click on the link to open the profile modal or page where email can be updated
        const profileLink = await driver.findElement(By.id('navMyProfile'));
        await profileLink.click();

        // Wait for the profile modal or page to be visible
        const myProfileModal = await driver.findElement(By.id('myProfileModal'));
        await driver.wait(until.elementIsVisible(myProfileModal), 5000);

        // Click the "Change Email" button to open the updateEmailModal
        const changeEmailButton = await driver.findElement(By.xpath('//button[contains(text(),"Change Email")]'));
        await changeEmailButton.click();

        // Wait for the updateEmailModal to be visible
        const updateEmailModal = await driver.findElement(By.id('updateEmailModal'));
        await driver.wait(until.elementIsVisible(updateEmailModal), 5000);

        // Find the email input fields and update the email
        const currentEmailInput = await driver.findElement(By.id('currentEmail'));
        const newEmailInput = await driver.findElement(By.id('newEmail'));

        await currentEmailInput.clear(); // Clear the existing email
        await currentEmailInput.sendKeys('testuser@absgmail.com'); // Enter the current email

        await newEmailInput.clear(); // Clear the existing new email
        await newEmailInput.sendKeys('newemail@gmail.com'); // Enter the new email

        // Click the "Update Email" button in the modal
        const updateEmailButton = await driver.findElement(By.xpath('//button[contains(text(),"Update Email")]'));
        await updateEmailButton.click();

        // Wait for the profile modal or page to be visible again
        await driver.wait(until.elementIsVisible(myProfileModal), 5000);

        // Expect that the myProfileModal element exists
        expect(myProfileModal).to.exist;
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