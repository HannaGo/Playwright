import { Given, When } from "@cucumber/cucumber";
import { Page } from "playwright";

//let page: Page; //Represents a single web page within a context

When('I enter a valid first name', async () => {
    //await page.pause();
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
});