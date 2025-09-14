import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";

let alertText: string;


Given('I navigate to the webdriveruniversity login page', async () => {
    //Access URL
    await pageFixture.page.goto('http://www.webdriveruniversity.com/Login-Portal/index.html');
});

When('I type a username {word}', async (username: string) => {
    await pageFixture.page.getByPlaceholder("Username").fill(username);
    await pageFixture.page.waitForTimeout(2000); 

});


When('I type a password {word}', async (password) => {
    await pageFixture.page.getByPlaceholder("Password").fill(password);
    await pageFixture.page.waitForTimeout(2000); 


});


When('I click on the login button', async () => {
    //add a listener:
    await pageFixture.page.on("dialog", async (alert) => {
        alertText = alert.message();
        console.log("The alert message is: " + alertText);
        await alert.accept();
    });


    const loginButton = await pageFixture.page.locator('#login-button');
    await loginButton.hover();
    await loginButton.click({ force: true });
    await pageFixture.page.waitForTimeout(2000);   

});



Then('I should see an alert with a text {string}', async (expectedAlertText: string) => {
    expect(alertText).toBe(expectedAlertText);
});

