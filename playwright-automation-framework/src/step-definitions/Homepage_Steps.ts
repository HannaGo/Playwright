import { Given, When, Then } from '@cucumber/cucumber';
import { url } from 'inspector';
import { chromium, Browser, Page } from "playwright";

let browser: Browser;
let context: any;
let page: Page;

const URL = 'http://www.webdriveruniversity.com/';

Given('I navigate to webdriveruniversity.com', async () => {
    //Setup browser instance:
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    page = await context.newPage();

    //Access URL
    await page.goto(URL);

});

When('I click on the Contact Us button', async () => {
    //await page.pause();
    const contactUs_Button = await page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
    await contactUs_Button.click();
});

When('I switch to the new browser tab', async () => {
    page = await context.waitForEvent('page');
    await page.bringToFront();
});