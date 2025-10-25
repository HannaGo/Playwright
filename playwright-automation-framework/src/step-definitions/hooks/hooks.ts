import {After, AfterAll, Before, BeforeAll, Status} from '@cucumber/cucumber'; 
import { Browser, BrowserType, chromium, firefox, webkit} from '@playwright/test';
import{ pageFixture } from './browserContextFixture';

//load env variables from .env file
import { config as loadEnv } from 'dotenv';
const env = loadEnv({path: './env/.env'});


//Create a configuratuon object for easy access to env variables
const config = {
    headless: env.parsed?.HEADLESS === 'true',
    browser: env.parsed?.UI_AUTOMATION_BROWSER || 'chromium',
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(env.parsed?.BROWSER_HEIGHT || '1080'),
}

//Create dictionary mapping browser names to their launch functions
const browsers: {[key: string]: BrowserType} = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit
    // Add other browsers like firefox and webkit if needed. see playwright.config.ts for reference
};

let browserInstance: Browser | null = null;

async function initializeBrowserContext(selectedBrowser: string): Promise<Browser> {
    const launchBrowser = browsers[selectedBrowser];
    if(!launchBrowser){
        throw new Error(`Invalid browser selected: ${selectedBrowser}`);
    }

    return await launchBrowser.launch({headless: config.headless});
};


//Runs once Before all Scenarios
BeforeAll(async function() {
    console.log("\n Executing test suites... ");
});

//Runs once After all Scenarios
AfterAll(async function() {
    console.log("\n Test suites execution completed. ");
});

// Before hook: Runs before each scenario
Before(async function() {
        browser = await chromium.launch({ headless: false });
        pageFixture.context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
        pageFixture.page = await pageFixture.context.newPage();
    
});

After(async function({ pickle, result }) {
    if(result?.status === Status.FAILED){
        if(pageFixture.page){
            const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({ 
                path: screenshotPath, 
                type: 'png', 
                //timeout: 60000
            });
            await this.attach(image, 'image/png');
        } else{
            console.error("PageFixture.page is underfined");
        }
    }
   
    await pageFixture.page.close();
    await browser.close();
});