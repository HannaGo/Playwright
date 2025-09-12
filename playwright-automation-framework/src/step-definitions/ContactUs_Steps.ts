import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

When('I type a first name', async () => {
    await pageFixture.page.getByPlaceholder('First Name').fill("Joe");
});

When('I enter a valid last name', async () => {
    await pageFixture.page.getByPlaceholder('Last Name').fill("Bloggs");

});


When('I enter a valid email address',async () =>  {
    await pageFixture.page.getByPlaceholder('Email Address').fill("joe.bloggs@example.com");
});



When('I enter a valid message', async () => {
    await pageFixture.page.getByPlaceholder('Comments').fill("This is a test. Please ignore.");
    

});


When('I click on the Submit button', async () => {
    await pageFixture.page.waitForSelector('input[value="SUBMIT"]');
    await pageFixture.page.click('input[value="SUBMIT"]');
    await pageFixture.page.pause(); 
    
});


Then('I should see a success message for the form submission', async () =>  {

});