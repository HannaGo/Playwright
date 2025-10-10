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

//login to a new tab
When('I click on the Login Portal button', async () => {
    //await page.pause();
    const login_Button = await pageFixture.page.getByRole('link', { name: 'LOGIN PORTAL Login Portal' });
    await login_Button.click();
});

