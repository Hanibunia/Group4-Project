//Test Suite 2: User Registration//

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

describe('Testing Hanyi Register Frontend', function () {

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

    await emailInput.sendKeys('testuser@absgmail.com');
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
    //Test Suite 2: User Registration end /////////////////////////////////////




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
