import {After, AfterAll, Before, BeforeAll} from '@cucumber/cucumber'; 
import { Browser, chromium} from '@playwright/test';
import{ pageFixture } from './browserContextFixture';

let browser: Browser;

//Runs once Before all Scenarios
BeforeAll(async function() {
    console.log("\n Executing test suites... ");
});

//Runs once After all Scenarios
AfterAll(async function() {
    console.log("\n Test suites execution completed. ");
});

Before(async function() {
        browser = await chromium.launch({ headless: false });
        pageFixture.context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
        pageFixture.page = await pageFixture.context.newPage();
    
});

After(async function() {
    await pageFixture.page.close();
    await browser.close();
});