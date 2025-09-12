import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";


When('I type a first name', async () => {
    await pageFixture.page.getByPlaceholder('First Name').fill("Joe");
});

When('I enter a valid last name', async () => {
    await pageFixture.page.getByPlaceholder('Last Name').fill("Bloggs");

});


When('I enter a valid email address', async () => {
    await pageFixture.page.getByPlaceholder('Email Address').fill("joe.bloggs@example.com");
});


When('I enter a valid message', async () => {
    await pageFixture.page.getByPlaceholder('Comments').fill("This is a test. Please ignore.");
});


When('I click on the Submit button', async () => {
    await pageFixture.page.waitForSelector('input[value="SUBMIT"]');
    await pageFixture.page.click('input[value="SUBMIT"]');
    //await pageFixture.page.pause(); 

});


Then('I should see a success message for the form submission', async () => {
    //waiting for the header text element.
    await pageFixture.page.waitForSelector('#contact_reply h1');

    //get the text from the h1 element
    const text = await pageFixture.page.innerText('#contact_reply h1', { timeout: 60000 });

    //use Playwright "expect"
    expect(text).toBe("Thank You for your Message!");


});

Then ('I should be presented with an unsuccessful contact us message', async () => {
    await pageFixture.page.waitForSelector('body');

    const bodyElement = await pageFixture.page.locator('body');

    //Extract the text from the element
    const bodyText = await bodyElement.textContent();

    await expect(bodyText).toMatch(/Error: (all fields are required|Invalid email address)/);
});