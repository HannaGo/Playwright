import { When, Given } from '@cucumber/cucumber';
import { pageFixture } from '../step-definitions/hooks/browserContextFixture';

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

    //await pageFixture.page.pause(); 
});

Given('I wait for {int} second', async (seconds: number) => {
    await pageFixture.page.waitForTimeout(seconds * 1000);
});