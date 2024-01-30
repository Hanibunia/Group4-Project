
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

//Test Suite 3: Error Handling /////////////////////////////////////////
describe('Testing Hanyi Error Handling Frontend', function () {

    it('Should display error for invalid email or password', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        this.timeout(100000);

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
        this.timeout(100000);

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
});

/////Test Suite 3: Error Handling end /////////////////////////////////////////
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
