import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from '@faker-js/faker';


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

Then('I should be presented with an unsuccessful contact us message', async () => {
    await pageFixture.page.waitForSelector('body');

    const bodyElement = await pageFixture.page.locator('body');

    //Extract the text from the element
    const bodyText = await bodyElement.textContent();

    await expect(bodyText).toMatch(/Error: (all fields are required|Invalid email address)/);
});

//cucumber expressions
When('I type a specific first name {string}', async (firstName: string) => {
    //console.log(firstName);
    await pageFixture.page.getByPlaceholder('First Name').fill("firstName");

});


When('I enter a specific last name  {string}', async (lastName: string) => {
    // console.log(lastName); 
    await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);
});

When('I enter a specific email address {string}', async (emailAddress: string) => {
    //console.log(emailAddress);
    await pageFixture.page.getByPlaceholder('Email Address').fill(emailAddress);
});


When('I enter a specific message {string} and a number {int} within the comment input field', async (word: string, number: number) => {
    //console.log(`${word} ${number}`);
    await pageFixture.page.getByPlaceholder('Comments').fill(word + " " + number);
    //await pageFixture.page.pause();
});


///Random data generation using cucumber expressions


When('I type a random first name', async () => {
    //Faker code here
    const randomFirstName = faker.person.firstName();
    await pageFixture.page.getByPlaceholder('First Name').fill(randomFirstName);

});


When('I enter a random last name', async () => {
    //Faker code here
    const randomLastName = faker.person.lastName();
    await pageFixture.page.getByPlaceholder('Last Name').fill(randomLastName);

});



When('I enter a random email address', async () => {
    //Faker code here
    const randomEmail = faker.internet.email();
    await pageFixture.page.getByPlaceholder('Email Address').fill(randomEmail);
    //await pageFixture.page.pause();
});


//Scenario Outlines


When('I type a first name {word} and a last name {word}', async (firstName: string, lastName: string) => {
    await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
    await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);

});



When('I enter an email address {string} a comment {string}', async (email: string, comment: string) => {
    await pageFixture.page.getByPlaceholder('Email Address').fill(email);
    await pageFixture.page.getByPlaceholder('Comments').fill(comment);
    // await pageFixture.page.pause();

});



Then('I should be presented with header text {string}', async (message: string) => {
    //h1
    //body
    //   //h1 | //body
    //wait for the target element to be visible
    await pageFixture.page.waitForSelector("//h1 | //body", {state: 'visible'});

    //get all elements that match the locator
    const elements = await pageFixture.page.locator("//h1 | //body").elementHandles();
    
    let foundElementText = '';

    //loop through the elements
    for (let element of elements) {
        //get inner text of each element
        let text = await element.innerText();

        //if statement to check whether text includes expected string
        if (text.includes(message)) {
            foundElementText = text;
            break; //exit loop once we find a match           
        }
    }
    //perform an assertion to check if we found the expected text

    expect(foundElementText).toContain(message);
});