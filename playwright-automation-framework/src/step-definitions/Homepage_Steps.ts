import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../step-definitions/hooks/browserContextFixture';

const URL = 'http://www.webdriveruniversity.com/';

Given('I navigate to webdriveruniversity.com', async () => {
    //Access URL
    await pageFixture.page.goto(URL);

});

When('I click on the Contact Us button', async () => {
    //await page.pause();
    const contactUs_Button = await pageFixture.page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
    await contactUs_Button.click();
});

When('I switch to the new browser tab', async () => {
    await pageFixture.context.waitForEvent('page');

    //retrieve all current open pages (tabs)
    const allPages = pageFixture.context.pages();

    //assigne the most recent tab to pageFixture.page
    pageFixture.page = allPages[allPages.length - 1];

    //Bring the newly assigned tab to the front (Make it active)
    await pageFixture.page.bringToFront();

    //Ensure the newly assigned tab is also fully maximised
    await pageFixture.page.setViewportSize({ width: 1920, height: 1080 });
});