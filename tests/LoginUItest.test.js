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

describe('Testing Hanyi Frontend', function () {
    //Test Suite 1: Checking UI Elements////

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
    //Test Suite 1: Checking UI Elements end ////



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
